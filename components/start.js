import { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    ImageBackground,
    TouchableOpacity,
} from "react-native";

// Define the Start component
const Start = ({ navigation }) => {
    const [name, setName] = useState("");
    const [background, setBackground] = useState("#ffffff"); // Default background color

    return (
        <ImageBackground
            source={require("../assets/background-image.png")}
            style={styles.imageBackground}
            resizeMode="cover"
        >
            <Text style={styles.appTitle}>APP Title</Text>
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    value={name}
                    onChangeText={setName}
                    placeholder="Your Name"
                />

                <View style={styles.chooseColorBox}>
                    <Text style={styles.chooseColorText}>Choose Background Color:</Text>
                    <View style={styles.colorButtonsContainer}>
                        {/* Render a TouchableOpacity for each color option */}
                        <TouchableOpacity
                            style={[
                                styles.chooseColor,
                                { backgroundColor: "#090C08" },
                                background === "#090C08" && styles.selectedColor,
                            ]}
                            onPress={() => setBackground("#090C08")}
                        />
                        <TouchableOpacity
                            style={[
                                styles.chooseColor,
                                { backgroundColor: "#474056" },
                                background === "#474056" && styles.selectedColor,
                            ]}
                            onPress={() => setBackground("#474056")}
                        />
                        <TouchableOpacity
                            style={[
                                styles.chooseColor,
                                { backgroundColor: "#8A95A5" },
                                background === "#8A95A5" && styles.selectedColor,
                            ]}
                            onPress={() => setBackground("#8A95A5")}
                        />
                        <TouchableOpacity
                            style={[
                                styles.chooseColor,
                                { backgroundColor: "#B9C6AE" },
                                background === "#B9C6AE" && styles.selectedColor,
                            ]}
                            onPress={() => setBackground("#B9C6AE")}
                        />
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                        navigation.navigate("Chat", { name, background })
                    }
                >
                    <Text style={styles.textButton}>Start Chatting</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

// Define styles for the component
const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    appTitle: {
        flex: 1,
        fontSize: 45,
        fontWeight: "600",
        color: "#ffffff",
        justifyContent: "center",
        marginTop: 80,
    },
    container: {
        width: "88%",
        height: "44%",
        backgroundColor: "white",
        alignItems: "center",
        marginBottom: 30,
        justifyContent: "space-evenly",
    },
    textInput: {
        width: "88%",
        padding: 15,
        borderWidth: 1,
        fontSize: 16,
        fontWeight: "300",
        color: "#757083",
        opacity: 0.5,
        borderColor: "#757083",
    },
    button: {
        width: "88%",
        height: "20%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#757083",
        padding: 10,
    },
    textButton: {
        fontSize: 16,
        fontWeight: "600",
        color: "#ffffff",
    },
    chooseColorBox: {
        width: "88%",
        height: "20%",
        alignItems: "center",
        justifyContent: "space-between",
    },
    colorButtonsContainer: {
        flexDirection: "row",
        alignSelf: "flex-start",
        justifyContent: "space-between",
    },
    chooseColor: {
        width: 30,
        height: 30,
        borderRadius: 15,
        border: 3,
        marginRight: 15,
        borderColor: "white",
    },
    selectedColor: {
        borderColor: "#FCD95B",
        borderWidth: 3,
    },
    chooseColorText: {
        flex: 1,
        fontSize: 16,
        fontWeight: "300",
        color: "#757083",
        textAlign: "left",
        alignSelf: "flex-start",
    },
});

export default Start;