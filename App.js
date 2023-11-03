// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// create the navigator
const Stack = createNativeStackNavigator();

// to Initialize firebase and firestore
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";

// import the screens
import Start from './components/Start';
import Chat from './components/Chat';
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from 'react';


// for ignoring the warning in app  
import { StyleSheet, LogBox, Alert } from 'react-native';
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

// The app's main Chat component that renders the chat UI
const App = () => {

  // using NetInfo() to define a new state to represents network connectivity status
  const connectionStatus = useNetInfo();

  //  web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAjmiJl8z7IOt4150CvxJIEYfUUXcjjM8E",
    authDomain: "chat-app-b5b12.firebaseapp.com",
    projectId: "chat-app-b5b12",
    storageBucket: "chat-app-b5b12.appspot.com",
    messagingSenderId: "177515815075",
    appId: "1:177515815075:web:9ce9f44d85ecd5b577df16"
  };

  // initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Start'>
        <Stack.Screen name='Start' component={Start} />
        <Stack.Screen name='Chat'>
          {props => <Chat isConnected={connectionStatus.isConnected} db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default App;