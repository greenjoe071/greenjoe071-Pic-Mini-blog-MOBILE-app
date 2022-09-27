import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Button } from "react-native";
// import { Camera, CameraType } from 'expo-camera';
import {
    Entypo,
    AntDesign,
    FontAwesome5,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import { KeyboardAvoidingView } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "@react-navigation/native";
// import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { Auth, DataStore, Storage } from "aws-amplify";
import { Post } from "../models";
import { useState, useEffect } from "react";
import 'react-native-get-random-values'
import { v4 as uuidv4 } from "uuid";



const user = {
    id: "u1",
    image:
        "https://firebasestorage.googleapis.com/v0/b/photo-social-9d90d.appspot.com/o/images%2Fprofile_pic.png?alt=media&token=ae47ee46-71e2-4381-af0a-356841858949",
    name: "Joe Morales",
}

const CreatePostScreen = () => {
// const insets = useSafeAreaInsets();
const navigation = useNavigation();

 // *** CREATING A NEW POST ***
 const onSubmit = async () => {

    const userData = await Auth.currentAuthenticatedUser();

    const newPost = {
        description,
        // image
        numberOfLikes: 0,
        numberOfShares: 0,
        // postUserId: user.id,
        postUserId: userData.attributes.sub,
        _version: 1,
    };

    if (image) {
        newPost.image = await uploadFile(image);
    }

    await DataStore.save(new Post(newPost));
    setDescription("");
    setImage(null);
    navigation.goBack();
};


    
    useEffect(() => {
        const fetchUser = async () => {
            const userData = await Auth.currentAuthenticatedUser();
            const dbUser = await DataStore.query(User, userData.attributes.sub);
            if (dbUser) {
                setUser(dbUser);
                console.log(dbUser);
            } else {
                navigation.navigate("Update profile");
            }
        };

        fetchUser();
    }, []);

    // **TEXT DESCRIPTION OR POST-TEXT**
    const [description, setDescription] = useState("")
    // console.warn(description)


    const uploadFile = async (fileUri) => {
        try {
            const response = await fetch(fileUri);
            const blob = await response.blob();
            const key = `${uuidv4()}.png`;
            await Storage.put(key, blob, {
                contentType: "image/png, image/jpg, image/jpeg, video/*",
            });
            return key;
        } catch (err) {
            console.log("Error uploading file:", err);
        }
    }

   




    // IMAGE PICKER
    const [image, setImage] = useState(null)
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    //USING THE CAMERA      
    const openCamera = async () => {
        // Ask the user for the permission to access the camera
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("You've refused to allow this appp to access your camera!");
          return;
        }
    
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
            

    });
    
        // Explore the result
        console.log(result);
    
        if (!result.cancelled) {
            setImage(result.uri);
        }
    };
    


    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[styles.container, { marginBottom: 15 }]}
            contentContainerStyle={{ flex: 1 }}
        // keyboardVerticalOffset={150}
        >
            <View>
                <Text
                    style={styles.headerTitle}> Type some words, choose a pic ⬊</Text>
            </View>
            {/* HEADER */}
            <View style={styles.header}>

                <Image
                    source={{ uri: user.image }}
                    style={styles.profilePic} />
                <Text style={styles.name}>{user.name}</Text>
                <Entypo
                    onPress={pickImage}
                    name="images"
                    size={44}
                    color="darkblue"
                    style={styles.photoIcon}
                />
                <AntDesign onPress={openCamera}
                name="camera" 
                size={44} 
                color="darkblue" 
                style={styles.photoIcon}/>
            </View>



            {/* TEXT INPUT */}
            <TextInput
                placeholder="      Share some thoughts here..."
                multiline
                value={description}
                onChangeText={setDescription}
                style={styles.input}
            />
            <View style={styles.smallContainer}>
            {/* IMAGE */}
            <Image source={{ uri: image }} style={styles.photo} />

            {/* BUTTON */}
            <View style={styles.buttonContainer}>
                <Button title="Post it!"
                    onPress={onSubmit} />
            </View>
            </View>
        </KeyboardAvoidingView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        padding: 10,
        paddingTop: 30,
        backgroundColor: "#FFF"
    },
    headerTitle: {
        alignSelf: "center",
        marginTop: 22,
        fontWeight: "bold"
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",

    },
    profilePic: {
        height: 40,
        width: 40,
        borderRadius: 25,
        marginRight: 11

    },
    name: {
        fontWeight: "500",
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        marginBottom: 23,
        borderColor: "lightgray",
    },
    buttonContainer: {
        marginBottom: "auto",
        padding: 44,
    },
    photoIcon: {
        marginLeft: 30,
        marginRight: 2,
        padding:13,
    },
    smallContainer : {
        flexDirection: "row",
        paddingLeft: 55
        
    },
    photo: {
       
        aspectRatio: 4 / 3,
        width: "35%",
        borderWidth: 3,
        borderColor: "black",
        aspectRatio: 1,
        borderRadius: 16,
        // shadowColor: 'green',
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // alignSelf: "center"

    }


});


export default CreatePostScreen;