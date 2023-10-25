import { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";


const Chat = ({ route, navigation }) => {
    const { name } = route.params;
    const { color } = route.params;
    useEffect(() => {
        navigation.setOptions({ title: name });
    }, []);
    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            <Text style={styles.text}>Hello {name}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: '500'
    }
});
export default Chat;