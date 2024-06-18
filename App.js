// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();

//initialize a connection with Firestore
import { initializeApp } from 'firebase/app';
import { getFirestore, disableNetwork, enableNetwork } from 'firebase/firestore';

// import the screens
import Start from './components/Start';
import Chat from './components/Chat';
import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect } from 'react';
import { LogBox, Alert } from 'react-native';
import { getStorage } from 'firebase/storage';

LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const App = () => {
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection is lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]) //if the dependency's value changes, the useEffect() code will be re-executed
  // The web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCepn0jKfuS_ExfTRQnGoVMyYuYqpzI1q0",
    authDomain: "chatapp-53983.firebaseapp.com",
    projectId: "chatapp-53983",
    storageBucket: "chatapp-53983.appspot.com",
    messagingSenderId: "256691190211",
    appId: "1:256691190211:web:af44fd785788ac1b0d2576"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service, in this case, the "db" variable
  const db = getFirestore(app);
  const storage = getStorage(app); // initializes the Firebase storage handler

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start" //prop value should be the name of a Stack.Screen (either one)
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen name='Chat' >
          {props => <Chat isConnected={connectionStatus.isConnected} db={db} {...props} storage={storage} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;