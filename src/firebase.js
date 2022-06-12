// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

//Agregar
import {getAuth} from 'firebase/auth';
//

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

//Agregar
export const conexion_auth= getAuth(app);