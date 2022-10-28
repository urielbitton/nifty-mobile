import { StoreContext } from "app/store/store"
import React, { useContext, useState } from 'react'
import { Button, TextInput, View } from "react-native"
import { auth } from "../firebase/firebase"

export default function Login() {

  const { pageLoading, setPageLoading } = useContext(StoreContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

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
            return setEmailError('Make sure to enter a valid email.')
        case "auth/user/disabled":
            return setEmailError('This user is disabled.')
        case "auth/user-not-found":
            return setEmailError('This user does not exist.')
        case "auth/wrong-password":
          setPasswordError('Password is incorrect')
        break
        default:
      }  
    }) 
  }

  return (
    <View>
      <TextInput 
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        autoCapitalize="none"
        autoCorrect={false}
        value={password}
        onChangeText={setPassword}
      />
      <Button 
        title="Login" 
        onPress={handleLogin}
      />
    </View>
  )
}
