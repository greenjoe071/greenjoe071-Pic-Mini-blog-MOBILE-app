import { useState, useEffect} from "react"
import { StyleSheet, Text, Image, View, Pressable } from "react-native";
import {
    Entypo,
    AntDesign,
    FontAwesome5,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { DataStore } from "aws-amplify";
import { User } from "../models";
import { S3Image } from "aws-amplify-react-native";

const dummy_img =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/user.png";


const FeedPost = ({post}) => {
    const [isLiked, setLiked] = useState(false);
    const navigation = useNavigation();

    const [ user, setUser ] = useState(null);

    useEffect(() => {
        if (!post.postUserId) {
          return;
        }
        DataStore.query(User, post.postUserId).then(setUser);
      }, [post.postUserId]);


    return (
            <View style={styles.post}>

                {/* HEADER */}
                <Pressable style={styles.header}
                          onPress={() => navigation.navigate("Profile", { id: post.User?.id })}>
                    {user?.image ? (
    <S3Image imgKey={user.image} style={styles.profileImage} />
  ) : (
  <Image
    source={{ uri: dummy_img }}
    style={styles.profileImage}
  />
)}
                    <View>
                        <Text style={styles.name}>{user?.name}</Text>
                        <Text style={styles.subtitle}>{post.createdAt}</Text>
                    </View>
                    <Entypo
                        name="dots-three-horizontal"
                        size={18}
                        color="gray"
                        style={styles.icon}
                    />
                </Pressable>

                {/* BODY */}
                {post.description && <Text style={styles.description}>{post.description}</Text>}
                {/* conditionally rendering the image */}
                {post.image && <S3Image imgKey={post.image} 
                style={styles.image} 
                resizeMode="cover" />}


                {/* FOOTER */}
                <View style={styles.footer}>
                    {/* Stats row */}
                    <View style={styles.statsRow}>
                        <AntDesign name="like1" size={18} color="red" style={styles.likeIcon} />
                        {/* <Image source={LikeImage} style={styles.likeIcon}/> */}
                        <Text style={styles.likedBy}>
                            this person and {post.numberOfLikes} others
                        </Text>
                        <Text style={styles.shares}>{post.numberOfShares} shares
                        </Text>
                    </View>
                    {/* Buttons row */}
                    <View style={styles.buttonsRow}>
                        <View style={styles.iconButtons}>
                            <MaterialCommunityIcons
                                name="thumb-up-outline"
                                size={24} color="black" />
                            {/* <Text style={styles.iconButtonText}>Like it?</Text> */}
                        </View >
                        <View style={styles.iconButtons}>
                            <FontAwesome5
                                name="comment-alt"
                                size={24}
                                color="black" />
                            {/* <Text style={styles.iconButtonText}>Comment</Text> */}
                        </View>
                        <View style={styles.iconButtons}>
                            <MaterialCommunityIcons
                                name="share-outline"
                                size={34}
                                color="black"
                            />
                            {/* <Text style={styles.iconButtonText}>Share</Text> */}
                        </View>

                    </View>
                </View>
            </View>

    );
}




const styles = StyleSheet.create({
  
    //POST 
    post: {
        backgroundColor: "#fff",
        marginVertical: 5,
    },
    header: {
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
    },

    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 25,
        marginRight: 10,
    },
    name: {
        fontWeight: "500",

    },
    subtitle: {
        color: "gray",

    },
    icon: {
        marginLeft: "auto",
    },

    //BODY
    description: {
        padding: 10,
        lineHeight: 20,
        letterSpacing: 0.5,
        // borderWidth: 1,
        // borderColor: "red",
        marginTop: -2

    },
    image: {
        width: "100%",
        aspectRatio: 4 / 5,
        borderRadius: 11,
    },
    //FOOTER
    footer: {
        paddingHorizontal: 10,
        // borderWidth: 1,
        // borderColor: "red",

    },

    // Stats Row
    statsRow: {

        backgroundColor: '#fafafa',
        height: 40,
        marginHorizontal: 20,
        marginTop: -7,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingHorizontal: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    likeIcon: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
    likedBy: {
        color: "gray",
    },
    shares: {
        color: "gray",
        marginLeft: "auto",
    },
    //BUTTONS ROW
    buttonsRow: {
        marginVertical: 5,
        flexDirection: "row",
        borderRadius: 10,
        shadowColor: "#000",
        justifyContent: "space-between",
        marginTop: 11,

        marginLeft: 42,
        marginRight: 42,
        // borderBottomWidth: StyleSheet.hairlineWidth,


    },

    iconButtons: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 1,
        paddingBottom: 10,
        // marginBottom:6,
    }


});
export default FeedPost;