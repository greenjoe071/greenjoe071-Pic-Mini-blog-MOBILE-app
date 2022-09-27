import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList} from "react-native";
import Navigator from './src/navigation';

import { Amplify, Auth } from "aws-amplify";
import awsconfig from "./src/aws-exports";

import { withAuthenticator } from 'aws-amplify-react-native';


Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });

function App() {
  // const [authUser, setAuthUser] = useState(null);
  // useEffect(() => {
  //   Auth.currentAuthenticatedUser().then(setAuthUser);
  // }, []);
  
  // console.log(authUser);


  return (
    
    <View style={styles.container}>
      <Navigator />
      <StatusBar style='auto' />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#ededed',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default withAuthenticator(App);