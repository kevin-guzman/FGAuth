/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import {
  AccessToken,
  LoginManager
} from 'react-native-fbsdk';

import {
GoogleSignin,
}from 'react-native-google-signin'

//545106945606-ua0gksp1hv5n1argfm2da7jbu72vprdp.apps.googleusercontent.com

const App = () => {
  const FBLogin = async() =>{
    const login = await LoginManager.logInWithPermissions(['public_profile'])
    console.log('Login:', login)
    if(!login.isCancelled){
      const getToken = await AccessToken.getCurrentAccessToken()
      const token = getToken.accessToken
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)
      const jsonResponse = await response.json()
      const {name, email, id, picture:{data}} = jsonResponse
      console.log(jsonResponse)
    }else{
      console.log('Login canceled')
    }
  }
  const GLogin = async() => {
    try {
      //GoogleSignin.signIn();
      GoogleSignin.configure(
        {
          webClientId:'1819118201-56v3o4gore9lbnmutnh65fjq7odmfkv9.apps.googleusercontent.com',
          androidClientId: '1819118201-56v3o4gore9lbnmutnh65fjq7odmfkv9.apps.googleusercontent.com'
        }
        )
        await GoogleSignin.hasPlayServices();
      const ud = await GoogleSignin.signIn()
      console.log(ud)
      
    } catch (error) {
      console.log(error)
    }
  }
  return(
    <View style={{marginVertical:'40%', marginHorizontal:'20%'}} >

      <Button title='Facebook' onPress={()=>{FBLogin()}} />
      <Button title='Google' onPress={()=>{GLogin()}} />
    </View>
  )
} 

export default App;
