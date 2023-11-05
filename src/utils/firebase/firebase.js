import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  // retrive documents form inside our firestore database
  getDoc,
  setDoc,
  // allows us to get and set documnets data
} from "firebase/firestore";
// allows us to get firestore database into our web app
const firebaseConfig = {
  apiKey: "AIzaSyB18qlucI4IBVsjPVDcHsCZ1nwLh6ORmMg",
  authDomain: "todo-d6bf0.firebaseapp.com",
  projectId: "todo-d6bf0",
  storageBucket: "todo-d6bf0.appspot.com",
  messagingSenderId: "180661067573",
  appId: "1:180661067573:web:eb74aca2fac5030e7d367c",
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});
export const auth = getAuth();
export const signInwithGooglePopup = () => signInWithPopup(auth, provider);
//the entire code snippet below stores our user info to the db
//now setting up our database by creating its instance
export const db = getFirestore();
//now passing data from userAuth to our db
export const createUserDocumentFromUserAuth = async (userAuth) => {
  const createUserRef = doc(db, "users", userAuth.uid);
  //passing db,name of collection and an unique id to our doc function

  const userSnapshot = await getDoc(createUserRef);

  //setting user info to db

  //condition 1 if user data not exists
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(createUserRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log(error.message, "error while creating new user");
    }
  }

  //if user data exists
  return createUserRef;
};