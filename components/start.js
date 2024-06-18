import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { getAuth, signInAnonymously } from 'firebase/auth';


const Start = ({ navigation }) => {
    const auth = getAuth(); //initialize Firebase authentication handler
    const [name, setName] = useState(''); //useState to handle the input of a user's name
    const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE']; //colour choices for user
    const [background, setBackground] = useState(''); //state to handle setting background color as picked by user 

    //code to allow user to sign in anonymously
    const signInUser = () => {
        signInAnonymously(auth)
            .then(result => {
                navigation.navigate("Chat", { userID: result.user.uid, background: background, name: name }); //the user is now signed in, the app will go to "Chat" and pass user ID to it
                Alert.alert("Signed in Successfully!")
            })
            .catch((error) => {
                Alert.alert("Unable to sign in, try again later");
            })
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/Background-Image.png')} resizeMode='cover' style={styles.image}>
                <Text style={styles.appTitle} >Chat App</Text>
                <View style={styles.startOptionsContainer} >
                    <TextInput
                        style={styles.textInput}
                        value={name}
                        onChangeText={setName}
                        placeholder='Type your username here'
                    />
                    <View style={styles.colorChoiceContainer} >
                        <Text style={styles.colorChoiceText} >Choose Background Color</Text>
                        <View style={styles.colorButtonsContainer} >
                            {colors.map((color, index) => ( //maps the colors array to a button
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.colorChoiceButton,
                                        { backgroundColor: color },
                                        background === color && styles.selectedColor,
                                    ]}
                                    onPress={() => setBackground(color)}
                                />
                            ))}
                        </View>
                    </View>
                    {/* button to enter chat */}
                    <TouchableOpacity
                        onPress={signInUser}
                        style={styles.chatButton}
                        accessible={true}
                        accessibilityLabel='Chat entrance'
                        accessibilityHint='Takes the user to chat room'
                        accessibilityRole='button'>
                        <Text style={styles.chatButtonText}>Start Chatting</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        flex: 1,
        justifyContent: "center",
        height: "100%",
        width: "100%",
        alignItems: "center",
    },
    appTitle: {
        color: "#FFFFFF",
        fontSize: 45,
        fontWeight: "600",
        textAlign: "center",
        flex: 1,
        margin: 10,
    },
    startOptionsContainer: {
        height: "50%",
        width: "88%",
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: 'space-around',
        marginBottom: '6%',
    },
    textInput: {
        width: "88%",
        height: 60,
        padding: 15,
        fontSize: 16,
        fontWeight: '300',
        opacity: 50,
        borderWidth: 1,
        borderColor: "#757083",
        marginBottom: 10,
    },
    colorChoiceContainer: {
        width: '84%',
        alignItems: 'center',
    },
    colorChoiceText: {
        alignSelf: 'flex-start',
        color: "#757083",
        fontSize: 16,
        fontWeight: "300",
        opacity: 100,
    },
    colorButtonsContainer: {
        flexDirection: "row",
        alignSelf: 'flex-start',
    },
    colorChoiceButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 5,
    },
    chatButton: {
        width: "88%",
        height: 60,
        padding: 10,
        backgroundColor: "#757083",
        justifyContent: 'center',
        alignItems: 'center',
    },
    chatButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#FFFFFF",
    },
});

export default Start;