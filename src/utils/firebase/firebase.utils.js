import { initializeApp } from "firebase/app";
import {getAuth,signInWithPopup,signInWithRedirect,GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import {getFirestore,doc,getDoc,setDoc} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAJfE6jE2Gab5ovXbbFqUUZGzk99G3_jwI",

  authDomain: "kings-klothing-db.firebaseapp.com",

  projectId: "kings-klothing-db",

  storageBucket: "kings-klothing-db.appspot.com",

  messagingSenderId: "826737269136",

  appId: "1:826737269136:web:2a39c91111b709c2db7b15",

  measurementId: "G-XPTV59Y2BH",
};

const app = initializeApp(firebaseConfig);
const provider  = new GoogleAuthProvider();

provider.getCustomParameters({
    prompt:"select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,provider);
export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth,additionalInformation={}) => {
  
  if(!userAuth) return;

  const useDocRef = doc(db,'users',userAuth.uid)

  const userSnapshot = await getDoc(useDocRef);
  
  if(!userSnapshot.exists()){
  
    const {displayName ,email} = userAuth
    const createdAt = new Date();
  
    try {
      await setDoc(useDocRef,{
        displayName,
        email,
        createdAt,
        ...additionalInformation
      })
    }catch(error){
      console.log("Error occured during creating user",error.message)
    }
  }
  return useDocRef;
}

export const createUserAuthWithEmailandPassword = async (email,password) => {
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth,email,password) 
}
export const signUserAuthWithEmailandPassword = async (email,password) => {
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth,email,password)
}