import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'

const FIREBASE_CONFIG = {
   apiKey: process.env.FIREBASE_APIKEY,
   authDomain: process.env.FIREBASE_AUTHDOMAIN,
   databaseURL: process.env.FIREBASE_DATABASEURL,
   projectId: process.env.FIREBASE_PROJECTID,
   storageBucket: process.env.FIREBASE_STORAGEBUCKET,
   messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
   appId: process.env.FIREBASE_APPID,
}

const instance = firebase.initializeApp(FIREBASE_CONFIG)
const firestorage = firebase.storage()
const firestore = firebase.firestore()

export { instance, firestore, firestorage, firebase }
