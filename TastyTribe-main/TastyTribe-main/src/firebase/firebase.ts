import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCWna5_aE3swxMojYwG2fVg-usZcc2Ic7k",
  authDomain: "tastytribeauthentication.firebaseapp.com",
  projectId: "tastytribeauthentication",
  storageBucket: "tastytribeauthentication.appspot.com",
  messagingSenderId: "631345923860",
  appId: "1:631345923860:web:c28a07b974d34e023ae401",
  measurementId: "G-VXZYCNSVM6",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
