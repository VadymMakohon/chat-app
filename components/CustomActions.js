import { TouchableOpacity, View, Text, StyleSheet, Alert } from "react-native";
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const CustomActions = ({ wrapperStyle, iconTextStyle, onSend, storage, userID }) => {
    const actionSheet = useActionSheet();

    const onActionPress = () => {
        const options = ['Choose From Library', 'Take Picture', 'Record Video', 'Send Location', 'Cancel'];
        const cancelButtonIndex = options.length - 1;
        actionSheet.showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            async (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        pickImage();
                        return;
                    case 1:
                        takePhoto();
                        return;
                    case 2:
                        recordVideo();
                        return;
                    case 3:
                        getLocation();
                        return;
                    default:
                }
            },
        );
    };

    const getLocation = async () => {
        let permissions = await Location.requestForegroundPermissionsAsync();
        if (permissions.granted) {
            const location = await Location.getCurrentPositionAsync({});
            if (location) {
                Alert.alert("Info", "While using this app");
                onSend({
                    location: {
                        longitude: location.coords.longitude,
                        latitude: location.coords.latitude,
                    },
                });
            } else Alert.alert("Error occurred while fetching location");
        } else Alert.alert("Permissions haven't been granted.");
    };

    const uploadAndSendMedia = async (mediaURI, mediaType) => {
        const uniqueRefString = generateReference(mediaURI);
        const newUploadRef = ref(storage, uniqueRefString);
        const response = await fetch(mediaURI);
        const blob = await response.blob();
        uploadBytes(newUploadRef, blob).then(async (snapshot) => {
            const mediaURL = await getDownloadURL(snapshot.ref);
            onSend({ [mediaType]: mediaURL });
            Alert.alert("Info", "While using this app");
        }).catch((error) => {
            Alert.alert("Error uploading media:", error.message);
        });
    };

    const generateReference = (uri) => {
        const timeStamp = (new Date()).getTime();
        const mediaName = uri.split("/")[uri.split("/").length - 1];
        return `${userID}-${timeStamp}-${mediaName}`;
    };

    const pickImage = async () => {
        let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissions.granted) {
            let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
            if (!result.canceled) await uploadAndSendMedia(result.assets[0].uri, 'image');
        } else {
            Alert.alert("Permissions haven't been granted.");
        }
    };

    const takePhoto = async () => {
        let permissions = await ImagePicker.requestCameraPermissionsAsync();
        if (permissions.granted) {
            let result = await ImagePicker.launchCameraAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
            if (!result.canceled) await uploadAndSendMedia(result.assets[0].uri, 'image');
        } else {
            Alert.alert("Permissions haven't been granted.");
        }
    };

    const recordVideo = async () => {
        let permissions = await ImagePicker.requestCameraPermissionsAsync();
        if (permissions.granted) {
            let result = await ImagePicker.launchCameraAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Videos });
            if (!result.canceled) await uploadAndSendMedia(result.assets[0].uri, 'video');
        } else {
            Alert.alert("Permissions haven't been granted.");
        }
    };

    return (
        <TouchableOpacity style={styles.container} onPress={onActionPress}>
            <View style={[styles.wrapper, wrapperStyle]}>
                <Text style={[styles.iconText, iconTextStyle]}>+</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 10,
    },
    wrapper: {
        borderRadius: 13,
        borderColor: '#b2b2b2',
        borderWidth: 2,
        flex: 1,
    },
    iconText: {
        color: '#b2b2b2',
        fontWeight: 'bold',
        fontSize: 15,
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
});

export default CustomActions;