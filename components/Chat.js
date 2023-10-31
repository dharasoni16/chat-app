import { useEffect, useState } from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from "react-native";
// import GiftedChat library
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
    const { userID, name, color } = route.params;

    // messages state initialization
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // code to execute when component mounted or updated
        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
        const unsubmessages = onSnapshot(q, (documentsSnapshot) => {
            let newMessages = [];
            documentsSnapshot.forEach(doc => {
                newMessages.push({
                    id: doc.id, ...doc.data(), createdAt: new Date(doc.data().createdAt.toMillis())
                });
            });
            setMessages(newMessages);
        });

        // Clean up code
        return () => {
            // code to execute when the component will be unmounted
            if (unsubmessages) unsubmessages();
        }
    }, []);

    useEffect(() => {
        navigation.setOptions({ title: name });
    }, []);

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

    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            <GiftedChat messages={messages}
                renderBubble={renderBubble}
                onSend={messages => onSend(messages)}
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