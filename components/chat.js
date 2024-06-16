import { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

// Destructure name and background from route.params
const Chat = ({ route, navigation }) => {
    const { name, background } = route.params;

    // useEffect hook to set navigation options
    useEffect(() => {
        navigation.setOptions({ title: name });
    }, [navigation, name]);

    /* Render a View component with dynamic background color */
    return (
        <View style={[styles.container, { backgroundColor: background }]}>
            <Text style={styles.greeting}>Welcome, {name}!</Text>
            <Text>Let's Chat!</Text>
        </View>
    );
};

// Define styles for the component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    greeting: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default Chat;
