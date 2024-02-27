"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
// Import the functions you need from the SDKs you need
const app_1 = require("firebase/app");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.apiKey,
    projectId: process.env.projectId,
    storageBucket: "maouhub-animemash.appspot.com",
    messagingSenderId: process.env.messagingSenderId,
    measurementId: process.env.measurementId,
};
// Initialize Firebase
exports.app = (0, app_1.initializeApp)(firebaseConfig);
//# sourceMappingURL=firebase.js.map