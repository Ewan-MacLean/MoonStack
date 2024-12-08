import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  query, 
  where, 
  getDocs 
} from 'firebase/firestore';

// Firebase Configuration (replace with your own config)
const firebaseConfig = {
    apiKey: "AIzaSyBgYimsK4R1yaPaYEQIeeRZnHUoLI-FLOY",
    authDomain: "moonstack-ac618.firebaseapp.com",
    projectId: "moonstack-ac618",
    storageBucket: "moonstack-ac618.firebasestorage.app",
    messagingSenderId: "872482092589",
    appId: "1:872482092589:web:0591d6f987918609406aa4",
    measurementId: "G-911NW88XYF",
    rules: {
     ".read": true,
     ".write": true
   }
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const specialOfTheDay = doc(db,'dailySpecial')
function writeDailySpecial(){
  const docData = {
    description:'delicious latte',
    price:2.99,
    milk:'whole',
    vegan:false
  }
  setDoc(specialOfTheDay,docData,{merge:true})
}
console.log('lets go firestore!!!')
writeDailySpecial()

// export { AuthService, WatchlistService };