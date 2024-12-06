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
    measurementId: "G-911NW88XYF"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Authentication Service
const AuthService = {
  // User Registration
  register: async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Create user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        createdAt: new Date()
      });
      
      return user;
    } catch (error) {
      console.error("Registration error", error);
      throw error;
    }
  },

  // User Login
  login: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Login error", error);
      throw error;
    }
  },

  // User Logout
  logout: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error", error);
      throw error;
    }
  },

  // Get Current User
  getCurrentUser: () => {
    return auth.currentUser;
  }
};

// Watchlist Service
const WatchlistService = {
  // Add Stock to Watchlist
  addToWatchlist: async (stockSymbol) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');

      const watchlistRef = doc(db, 'watchlists', user.uid, 'stocks', stockSymbol);
      await setDoc(watchlistRef, {
        symbol: stockSymbol,
        addedAt: new Date(),
        notes: ''
      });
    } catch (error) {
      console.error("Error adding to watchlist", error);
      throw error;
    }
  },

  // Remove Stock from Watchlist
  removeFromWatchlist: async (stockSymbol) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');

      const watchlistRef = doc(db, 'watchlists', user.uid, 'stocks', stockSymbol);
      await deleteDoc(watchlistRef);
    } catch (error) {
      console.error("Error removing from watchlist", error);
      throw error;
    }
  },

  // Get User's Watchlist
  getUserWatchlist: async () => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');

      const watchlistRef = collection(db, 'watchlists', user.uid, 'stocks');
      const snapshot = await getDocs(watchlistRef);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error("Error fetching watchlist", error);
      throw error;
    }
  },

  // Add Notes to Stock in Watchlist
  addStockNotes: async (stockSymbol, notes) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');

      const watchlistRef = doc(db, 'watchlists', user.uid, 'stocks', stockSymbol);
      await setDoc(watchlistRef, { notes }, { merge: true });
    } catch (error) {
      console.error("Error adding notes", error);
      throw error;
    }
  }
};

export { AuthService, WatchlistService };