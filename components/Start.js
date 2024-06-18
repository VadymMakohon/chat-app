import { StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity, Alert, Platform, KeyboardAvoidingView } from 'react-native';
import { useState } from 'react';
import { getAuth, signInAnonymously } from 'firebase/auth';

const Start = ({ navigation }) => {
    const [name, setName] = useState("");
    const [color, setColor] = useState("#090C08");
    const auth = getAuth();

    const signInUser = () => {
        signInAnonymously(auth)
            .then(result => {
                navigation.navigate("Chat", { userID: result.user.uid, name: name, color: color });
                Alert.alert("Signed in Successfully!");
            })
            .catch((error) => {
                Alert.alert("Unable to sign in, try later again.");
            });
    };

    return (
        <ImageBackground
            source={require("../assets/background-image.png")}
            style={styles.container}
        >
            <View style={styles.titleView} >
                <Text style={styles.appTitle}>Welcome to Chat App</Text>
            </View>
            <View style={styles.mainView} >
                <TextInput
                    style={styles.textInput}
                    value={name}
                    onChangeText={setName}
                    placeholder="Your name"
                />
                <View>
                    <Text style={styles.chooseBackgroundText}>Choose background color:</Text>
                    <View style={styles.colorsContainer}>
                        <TouchableOpacity
                            style={[styles.selectStyleColor, styles.selectColor1]}
                            onPress={() => setColor("#090C08")}
                        />
                        <TouchableOpacity
                            style={[styles.selectStyleColor, styles.selectColor2]}
                            onPress={() => setColor("#474056")}
                        />
                        <TouchableOpacity
                            style={[styles.selectStyleColor, styles.selectColor3]}
                            onPress={() => setColor("#8A95A5")}
                        />
                        <TouchableOpacity
                            style={[styles.selectStyleColor, styles.selectColor4]}
                            onPress={() => setColor("#B9C6AE")}
                        />
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.buttonStart}
                    onPress={signInUser}
                >
                    <Text style={styles.buttonText}>Start Chatting</Text>
                </TouchableOpacity>
            </View>
            {Platform.OS === 'ios' ? <KeyboardAvoidingView behavior="padding" /> : null}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    titleView: {
        flex: 1,
        justifyContent: 'center',
    },
    appTitle: {
        fontSize: 25,
        fontWeight: '600',
        color: "#FFFFFF",
        textAlign: 'center'
    },
    mainView: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
        width: '88%',
        height: '40%',
        justifyContent: 'space-evenly',
        borderRadius: 10,
        padding: 20,
    },
    textInput: {
        fontSize: 20,
        fontWeight: '300',
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#757083',
        marginTop: 15,
        marginBottom: 15,
        borderRadius: 7
    },
    chooseBackgroundText: {
        fontSize: 18,
        fontWeight: '300',
        color: "#757083",
        opacity: 1,
        marginBottom: 10,
    },
    colorsContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        width: '100%',
    },
    selectStyleColor: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginHorizontal: 5, // Adjust this value to change the spacing between the color options
    },
    selectColor1: {
        backgroundColor: "#090C08"
    },
    selectColor2: {
        backgroundColor: "#474056"
    },
    selectColor3: {
        backgroundColor: "#8A95A5"
    },
    selectColor4: {
        backgroundColor: "#B9C6AE"
    },
    buttonStart: {
        width: '100%',
        padding: 15,
        alignItems: 'center',
        backgroundColor: "#757083",
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
        textAlign: 'center'
    },
});

export default Start;
