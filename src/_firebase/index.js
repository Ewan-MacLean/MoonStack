import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {
    getFirestore,
    collection,
    doc,
    setDoc,
    deleteDoc,
    query,
    where,
    getDocs,
    getDoc,
    addDoc,
    orderBy,
} from "firebase/firestore";
import { useState } from "react";

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
        ".write": true,
    },
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
const db = getFirestore(app);
const firestore = getFirestore();

// const watchlist = collection(db, "watchList");
const users = collection(db, "users");

const getUsers = async () => {
    const usersSnapshot = await getDocs(users);
    // console.log(usersSnapshot);
    usersSnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log( doc.id, ":", doc.data());
    });
};

getUsers()

// below function written by Claude
export async function addToWatchlist(ticker) {
  try {
    // Reference to the user's watchlist subcollection
    const watchlistRef = collection(doc(db, 'users', 'test-user'), 'watchlist');
    
    // Check if the stock is already in the watchlist
    const existingStockQuery = query(
      watchlistRef, 
      where('symbol', '==', ticker.toUpperCase())
    );
    
    const existingStockSnapshot = await getDocs(existingStockQuery);
    
    // If stock already exists, return early
    if (!existingStockSnapshot.empty) {
      console.log(`Stock ${ticker} is already in the watchlist`);
      return null;
    }
    
    // Add new watchlist item
    const newWatchlistItemRef = await addDoc(watchlistRef, {
      symbol: ticker.toUpperCase(), // Normalize to uppercase
      addedAt: new Date(),
    });
    
    return newWatchlistItemRef.id;
  } catch (error) {
    console.error(`Error adding ${ticker} to watchlist:`, error);
    throw error;
  }
}

export async function getUserWatchlist() {
  try {
    // Reference to the user's watchlist subcollection
    const watchlistRef = collection(
      getFirestore(), 
      'users', 
      'test-user', 
      'watchlist'
    );
    
    // Create a query to get all watchlist items, ordered by addition date
    const watchlistQuery = query(
      watchlistRef, 
      orderBy('addedAt', 'desc') // Most recent additions first
    );
    
    // Execute the query
    const querySnapshot = await getDocs(watchlistQuery);
    
    // Map documents to WatchlistItem array
    const watchlist = querySnapshot.docs.map(doc => ({
      id: doc.id,
      symbol: doc.data().symbol,
      addedAt: doc.data().addedAt.toDate(), // Convert Firestore timestamp
      notes: doc.data().notes || '' // Optional notes, default to empty string
    }));
    
    return watchlist;
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    throw error;
  }
}


// export default {addToWatchlist,getUserWatchlist};
