import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAALdXJSZnAe5wBAsTRM0WlR5oLm1qav30",
    authDomain: "catch-of-the-day-react-cuka.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-react-cuka.firebaseio.com",
  });

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// This is a default export
export default base;
