import FeedScreen from "../screens/FeedScreen";
import CreatePostScreen from "../screens/CreatePostScreen";
import ProfileScreen from "../screens/ProfileScreen";
import UpdateProfileScreen from "../screens/UpdateProfileScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
    Ionicons,
    FontAwesome,
    AntDesign,
} from "@expo/vector-icons";
import {
    View,
    Image, 
    Button,
} from "react-native";
import { Auth } from "aws-amplify";

// const { NavigationContainer } = require("@react-navigation/native");

const Stack = createNativeStackNavigator();
const signOut = async () => {
    await Auth.signOut();
};

const Navigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Feed"
                    component={FeedScreen}
                    title=""
                    options={({ navigation }) => ({
                        
                          
                          headerRight: () => (
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    // alignItems: "center",
                                    
                                }}
                            >
                                <Image
                                    style={{ marginRight: 167, width: 110, height: 30 }}
                                    source={require('../../assets/images/rpics-1.png')} />

                                <    AntDesign
                                    name="pluscircleo"
                                    size={25}
                                    color="black"
                                    style={{ marginRight: 20 }}
                                    onPress={() => navigation.navigate("Create Post")} />
                                <FontAwesome
                                    onPress={() => navigation.navigate("Profile")}
                                    name="user-circle-o"
                                    size={25}
                                    color="black"
                                    style={{ marginRight: 3 }}
                                />

                            </View>
                        ),
                    })}
                />

                <Stack.Screen name="Create Post"
                    component={CreatePostScreen} />

                <Stack.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={({ navigation }) => ({
                        headerRight: () => (
                            <Button title="log out"
                                    onPress={signOut}>
                            </Button>
                        ),
                    })}
                />

<Stack.Screen name="Update Profile" component={UpdateProfileScreen} />
            </Stack.Navigator>
            
        </NavigationContainer>
    );
};

export default Navigator;