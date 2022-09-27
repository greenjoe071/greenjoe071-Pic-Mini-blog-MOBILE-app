import { useState, useEffect } from "react";
import { FlatList, Pressable, Image, Text, StyleSheet } from "react-native";
import {
    Entypo,
    AntDesign,
    FontAwesome5,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
// import posts from "../../assets/data/posts.json"; 
import FeedPost from "../components/FeedPost";

import { useNavigation } from "@react-navigation/native";
import { DataStore, Predicates, SortDirection } from "aws-amplify";
import { Post } from '../models';


const img =
  "https://firebasestorage.googleapis.com/v0/b/photo-social-9d90d.appspot.com/o/images%2Fprofile_pic.png?alt=media&token=ae47ee46-71e2-4381-af0a-356841858949";





const FeedScreen = () => {
  const [posts, setPosts] = useState([])

    const navigation = useNavigation();

    useEffect(() => {
      const subscription = DataStore.observeQuery(Post, Predicates.ALL, {
        sort: (s) => s.createdAt(SortDirection.DESCENDING),
      }).subscribe(({ items }) => setPosts(items));
    
      return () => subscription.unsubscribe();
    }, []);

   
    const createPost = ()=> {
        navigation.navigate("Create Post")
    }

    return (
        <FlatList
        data={posts}
        renderItem={({item})=><FeedPost post={item}
        showsVerticalScrollIndicator={false}
        />}
        // ListHeaderComponent={() => (
        //     <Pressable onPress={createPost} style={styles.header}>
        //       <Image source={{ uri: img }} style={styles.profileImage} />
        //       <Text style={styles.name}>What's on your mind?</Text>
        //       <Entypo
        //         name="images"
        //         size={24}
        //         color="limegreen"
        //         style={styles.icon}
        //       />
        //     </Pressable>
        //   )}
         />
    )
};

export default FeedScreen;

const styles = StyleSheet.create({
    header: {
      padding: 10,
      paddingVertical: 15,
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      backgroundColor: "white",
    },
    profileImage: {
      width: 40,
      height: 40,
      borderRadius: 25,
      marginRight: 10,
    },
    name: {
      color: "gray",
    },
    icon: {
      marginLeft: "auto",
    },
  });