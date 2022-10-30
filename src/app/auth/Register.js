import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from 'app/store/store'
import { auth } from 'app/firebase/firebase'
import { setDB } from 'app/services/crudDB'
import firebase from "firebase"
import { Text, TextInput, View, StyleSheet } from "react-native"
import { Button } from "@rneui/themed"
import { useNavigation } from "@react-navigation/native"
import { colors } from "app/utils/colors"

export default function Register() {

  const { loggingAuth, setLoggingAuth, setMyUser,
    photoURLPlaceholder, pageLoading, setPageLoading } = useContext(StoreContext)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [passError, setPassError] = useState('')
  const navigation = useNavigation()

  const clearErrors = () => {
    setEmailError('')
    setPassError('')
  }

  const completeRegistration = (user, authMode, res) => {
    user.updateProfile({
      displayName: authMode === 'plain' ? `${firstName} ${lastName}` : authMode === 'google' ? res.additionalUserInfo.profile.name : res.name,
      photoURL: authMode === 'facebook' ? res.picture.data.url : photoURLPlaceholder
    })
    setDB('users', user.uid, {
      firstName: authMode === 'plain' ? firstName : authMode === 'google' ? res.additionalUserInfo.profile.given_name : res.first_name,
      lastName: authMode === 'plain' ? lastName : authMode === 'google' ? res.additionalUserInfo.profile.family_name : res.last_name,
      email: authMode === 'plain' ? email : authMode === 'google' ? res.additionalUserInfo.profile.email : res.email,
      photoURL: authMode === 'facebook' ? res.picture.data.url : photoURLPlaceholder,
      address: '',
      phone: '',
      password,
      city: '',
      region: '',
      country: '',
      userID: user.uid,
      dateJoined: new Date(),
      userType: 'seeker',
      interestedJobIDs: [],
      notInterestedJobIDs: [],
      resume: {
        dateAdded: new Date(),
        fileURL: null,
        name: null,
      }
    })
      .then(() => {
        setDB(`users/${user.uid}/notifications`, 'welcome', {
          notificationID: 'wellcome',
          dateCreated: new Date(),
          icon: 'fas fa-house-user',
          isRead: false,
          text: `Welcome to Rentage! We're glad you're here. You can start by searching for properties right away.`,
          url: '/',
          img: '',
        })
        setPageLoading(false)
      })
      .catch(err => {
        console.log(err)
        setPageLoading(false)
      })
  }

  const handleSignup = (authMode) => {
    if (authMode === 'google') {
      const provider = new firebase.auth.GoogleAuthProvider()
      provider.addScope('email')
      auth.signInWithPopup(provider)
        .then((res) => {
          if (res.additionalUserInfo.isNewUser) {
            completeRegistration(res.user, authMode, res)
          }
          else {
            setMyUser(res.user)
          }
        })
        .catch((error) => {
          console.log(error)
          if (error.code === 'auth/account-exists-with-different-credential')
            window.alert('You have already signed up with a different provider for that email. Please sign in with that provider.')
          else
            window.alert('An errror occurred with the google login. Please try again.')
        })
    }
    else if (authMode === 'facebook') {
      const provider = new firebase.auth.FacebookAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then((res) => {
          const credential = res.credential
          const user = res.user
          // @ts-ignore
          const accessToken = credential.accessToken
          fetch(`https://graph.facebook.com/me?access_token=${accessToken}&fields=name,first_name,last_name,email,picture.width(720).height(720)`)
            .then(fbRes => fbRes.json())
            .then(fbRes => {
              console.log(fbRes)
              completeRegistration(user, authMode, fbRes)
            })
            .catch(err => {
              console.log(err)
              setPageLoading(false)
            })
        })
        .catch((err) => {
          console.log(err)
          if (err.code === 'auth/account-exists-with-different-credential')
            alert('You have already signed up with a different provider. Please sign in with that provider.')
          else if (err.code === 'auth/popup-blocked')
            alert('Popup blocked. Please allow popups for this site.')
          else
            alert('An error with facebook has occured. Please try again later.')
        })
    }
    else if (firstName.length && lastName.length && password === confirmPassword && authMode === 'plain') {
      setPageLoading(true)
      auth.createUserWithEmailAndPassword(email.replaceAll(' ', ''), password.replaceAll(' ', ''))
        .then(() => {
          auth.onAuthStateChanged(user => {
            if (user && loggingAuth === 'signup') {
              completeRegistration(user, authMode)
            }
            else {
              setPageLoading(false)
            }
          })
        })
        .catch(err => {
          setPageLoading(false)
          switch (err.code) {
            case "auth/email-already-in-use":
              return alert('Please enter a valid email address.')
            case "auth/invalid-email":
              return alert('Please enter a valid email address.');
            case "auth/weak-password":
              return alert('The password is not long enough or too easy to guess.')
            default:
          }
        })
    }
    else {
      window.alert('Please fill in all fields.')
      setPageLoading(false)
    }
    clearErrors()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSignup('plain')
  }

  useEffect(() => {
    clearErrors()
  }, [])

  useEffect(() => {
    setLoggingAuth('signup')
  },[])

  return (
    <View style={styles.container}>
      <Text>Sign Up</Text>
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        textContentType="emailAddress"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        textContentType="password"
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        textContentType="password"
        secureTextEntry
        style={styles.input}
      />
      <Text onPress={() => navigation.navigate('Login')}>
        Sign In Instead
      </Text>
      <Button 
        title="Sign Up" 
        onPress={handleSubmit} 
        disabled={pageLoading}
        buttonStyle={styles.btn}
        containerStyle={styles.btnContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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