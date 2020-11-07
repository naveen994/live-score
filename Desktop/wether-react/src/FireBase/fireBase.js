import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

// Create &bConfigure .env as per below fileds, since these are mandatory fields
const firebaseConfig = {
    apiKey: "AIzaSyCr79_kG7sbKUIemZ0_Jhr3UBQO2qWKc50",
    authDomain: "live-score-bc85c.firebaseapp.com",
    databaseURL: "https://live-score-bc85c.firebaseio.com",
    projectId: "live-score-bc85c",
    storageBucket: "live-score-bc85c.appspot.com",
    messagingSenderId: "689152515149",
    appId: "1:689152515149:web:82444260e85a3be62cd004",
    measurementId: "G-1RTN08JYGJ"
};
class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.database = firebase.database();
    this.auth = firebase
      .auth()
      .signInAnonymously()
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        if (errorCode === "auth/operation-not-allowed") {
          alert("You must enable Anonymous auth in the Firebase Console.");
        } else {
          console.error(error);
        }
      });
  }

  //Create/Update data in firebase
  async write(id, data, collection) {
    try {
      if (!id) {
        id = this.database.ref().push().key;
      }
      data["id"] = id;
      await this.database.ref(collection + id).set(data); //'/users/'
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //Get all users data from firebase
  async getAll(collection) {
    try {
      return (await this.database.ref(collection).once("value")).val();
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  //Delete record from firebase based on the gievn ID
  async remove(id, collection) {
    try {
      this.database.ref(collection + id).remove();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
export default new Firebase();