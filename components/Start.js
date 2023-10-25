import { StyleSheet, Text, View, Button, TextInput, ImageBackground, TouchableOpacity } from "react-native";
import { useState } from 'react';

// assign image to image varaible
const image = require('../assets/BackgroundImage.png')

const Start = ({ navigation }) => {
    // creating the name state
    const [name, setName] = useState('');
    // creating background color state
    const [bgColor, setBgColor] = useState('white');
    // colors array to display different colors list
    const colors = ['#000000', '#696969', '#778899', '#D3D3D3'];

    return (
        //  to set the background image of app
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
            <Text style={styles.title}>Chat App</Text>
            <View style={styles.container}>
                <TextInput style={styles.textInput} value={name} onChangeText={setName} placeholder="Your Name">
                </TextInput>
                <Text style={styles.colorListTitle}>Choose Background Color:</Text>
                <View style={styles.bgColorList}>
                    {colors.map((color, index) => (
                        <TouchableOpacity key={index} style={[styles.circle, { backgroundColor: color }, bgColor === color && styles.selected]} onPress={() => setBgColor(color)}></TouchableOpacity>
                    ))}
                </View>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Chat', { name: name, color: bgColor })}>
                    <Text style={styles.btnText}>Start Chatting</Text>
                </TouchableOpacity>

            </View>
        </ImageBackground>
    );

}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '88%',
        height: '44%',
        backgroundColor: 'white',
    },
    textInput: {
        width: '88%',
        padding: 15,
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 15,
        backgroundColor: 'white'
    },
    image: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 25,
    },
    icon: {
        width: 50,
        height: 50,
    },
    title: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 80
    },
    bgColorList: {
        flexDirection: 'row',
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 10
    },
    colorListTitle: {
        color: 'gray',
        fontSize: 16,
        fontWeight: '300',
    },
    selected: {
        borderColor: 'gray',
        borderWidth: 2,
    },
    button: {
        backgroundColor: '#808080',
        width: '88%',
        padding: 15,
        marginTop: 15,
        marginBottom: 15,
    },
    btnText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '700'
    }

})
export default Start;
