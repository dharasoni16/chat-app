import { useEffect, useState } from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from "react-native";
// import GiftedChat library
import { Bubble, GiftedChat } from 'react-native-gifted-chat';

const Chat = ({ route, navigation }) => {
    const { name } = route.params;
    const { color } = route.params;

    // messages state initialization
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // setting the messages state with static message to see elements of the UI displayed on the Screen
        setMessages([{
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
                _id: 2,
                name: "React Native",
                avatar: "https://placeimg.com/140/140/any",
            },
        },
        {
            _id: 2,
            text: "This is a system message",
            createdAt: new Date(),
            system: true,
        },
        ]);
    }, []);

    useEffect(() => {
        navigation.setOptions({ title: name });
    }, []);

    const onSend = (newMessages) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
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
                user={{ _id: 1 }} style={{ backgroundColor: color }} />
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