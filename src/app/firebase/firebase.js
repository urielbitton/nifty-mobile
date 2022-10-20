import firebase from "firebase"
import Constants from "expo-constants"
 
const config = {
  apiKey: Constants?.manifest?.extra?.firebaseAPiKey,
  authDomain: Constants?.manifest?.extra?.authDomain,
  projectId: Constants?.manifest?.extra?.projectId,
  storageBucket: Constants?.manifest?.extra?.storageBucket,
  messagingSenderId: Constants?.manifest?.extra?.messagingSenderId,
  appId: Constants?.manifest?.extra?.appId,
}

const firebaseApp = firebase.initializeApp(config)

const db = firebaseApp.firestore()
const auth = firebaseApp.auth()
const storage = firebaseApp.storage()

export { db, auth, storage } 