import { useEffect, useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
// import GiftedChat library
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

const Chat = ({ route, navigation, db, storage, isConnected }) => {
    const { userID, name, color } = route.params;

    // messages state initialization
    const [messages, setMessages] = useState([]);

    let unsubmessages;
    useEffect(() => {
        // checking for network connection
        if (isConnected === true) {
            // unregister current onSnapshot() listener to avoid registering multiple listeners when useEffect code is re-executed
            if (unsubmessages) unsubmessages();
            unsubmessages = null;
            // code to execute when component mounted or updated
            const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
            unsubmessages = onSnapshot(q, (documentsSnapshot) => {
                let newMessages = [];
                documentsSnapshot.forEach(doc => {
                    newMessages.push({
                        id: doc.id, ...doc.data(), createdAt: new Date(doc.data().createdAt.toMillis())
                    });
                });
                cachedMessages(newMessages);
                setMessages(newMessages);
            });
        } else loadCachedMessages();

        // Clean up code
        return () => {
            // code to execute when the component will be unmounted
            if (unsubmessages) unsubmessages();
        }
    }, [isConnected]);

    useEffect(() => {
        navigation.setOptions({ title: name });
    }, []);

    // function to load data from cache
    const loadCachedMessages = async () => {
        const messagesFromCache = await AsyncStorage.getItem("messages") || [];
        setMessages(JSON.parse(messagesFromCache));
    }

    const cachedMessages = async (messageToCache) => {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(messageToCache));
        } catch (error) {
            console.log(error.message);
        }
    }

    // function to save sent messages on the firestore database
    const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0]);
    };

    const renderBubble = (props) => {
        return <Bubble {...props} wrapperStyle={{
            right: {
                backgroundColor: "#3d302d"
            },
            left: {
                backgroundColor: "#fff",
            }
        }} />;
    }

    // function to render input toolbar when connected to internet
    const renderInputToolbar = (props) => {
        if (isConnected) return <InputToolbar {...props} />;
        else return null;
    }

    // function responsible for creating circle button, for adding actions like take photo add image and gelocation in message
    const renderCustomActions = (props) => {
        return <CustomActions storage={storage} userID={userID} {...props} />;
    };

    // function checks if the current message contains location data , if yes it will return Mapview
    const renderCustomView = (props) => {
        const { currentMessage } = props;
        if (currentMessage.location) {
            return <MapView style={{
                width: 150,
                height: 100,
                borderRadius: 13,
                margin: 3
            }}
                region={{
                    latitude: currentMessage.location.latitude,
                    longitude: currentMessage.location.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
        }
        return null;
    }
    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            <GiftedChat messages={messages}
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolbar}
                onSend={messages => onSend(messages)}
                renderActions={renderCustomActions}
                renderCustomView={renderCustomView}
                user={{ _id: userID, name: name }} style={{ backgroundColor: color }} />
            {/* To prevent keyboard from covering bottom part of the screen */}
            {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});
export default Chat;