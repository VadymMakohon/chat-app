import { useEffect, useState } from "react";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { StyleSheet, View, Platform, KeyboardAvoidingView } from "react-native";
import {
    onSnapshot,
    query,
    orderBy,
    collection,
    addDoc,
} from "firebase/firestore";
const Chat = ({ db, route, navigation }) => {
    const { userID } = route.params;
    const { name, background } = route.params;
    const [messages, setMessages] = useState([]);
    const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0]);
    };

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: "#484848",
                    },
                    left: {
                        backgroundColor: "#fff",
                    },
                }}
            />
        );
    };

    // useEffect hook to set messages options
    // Create a query to get the "messages" collection from the Firestore database
    useEffect(() => {
        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

        // Subscribe to changes in the "messages" collection using onSnapshot.
        // This function will be called whenever there are changes in the collection.
        const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
            // Initialize an empty array to store the new messages
            let newMessages = [];
            // Iterate through each document in the snapshot
            documentsSnapshot.forEach((doc) => {
                newMessages.push({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: new Date(doc.data().createdAt.toMillis()),
                });
            });
            setMessages(newMessages);
        });

        // Clean up code
        return () => {
            if (unsubMessages) unsubMessages();
        };
    }, []);

    // useEffect hook to set navigation options
    useEffect(() => {
        navigation.setOptions({ title: name });
    }, []);
    /* Render a View component with dynamic background color */
    return (
        <View style={[styles.container, { backgroundColor: background }]}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                onSend={(messages) => onSend(messages)}
                user={{
                    _id: userID,
                    name: name,
                }}
            />
            {Platform.OS === "android" ? (
                <KeyboardAvoidingView behavior="height" />
            ) : null}
        </View>
    );
};
// Define styles for the component
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
export default Chat;