import { useNavigation } from "@react-navigation/native"
import { Button } from "@rneui/themed"
import { StoreContext } from "app/store/store"
import { colors } from "app/utils/colors"
import React, { useContext, useState } from 'react'
import { TextInput, View, StyleSheet, Text, Linking } from "react-native"
import { auth } from "../firebase/firebase"

export default function Login() {

  const { pageLoading, setPageLoading } = useContext(StoreContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const navigation = useNavigation()

  const handleLogin = () => {  
    setPageLoading(true)
    auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      setPageLoading(false)
      window.alert('Login successful')
    })
    .catch(err => {
      setPageLoading(false)
      switch(err.code) {
        case "auth/invalid-email":
          return alert('Make sure to enter a valid email.')
        case "auth/user/disabled":
          return alert('This user is disabled.')
        case "auth/user-not-found":
          return alert('This user does not exist.')
        case "auth/wrong-password":
          return alert('Password is incorrect')
        default:
      }  
    }) 
  }

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput 
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        autoCapitalize="none"
        autoCorrect={false}
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <Text onPress={() => navigation.navigate('Register')}>
        Sign Up Instead
      </Text>
      <Button 
        title="Login" 
        onPress={handleLogin}
        buttonStyle={styles.btn}
        containerStyle={styles.btnContainer}
        disabled={pageLoading}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    height: 40,
    width: 200,
    marginBottom: 20,
    padding: 5,
    borderBottomColor: colors.darkBlueGray,
    borderBottomWidth: 1
  },
  btnContainer: {
    width: 200,
    marginTop: 20,
    marginBottom: 10,
  },
  btn: {
    backgroundColor: colors.primary
  }
})
