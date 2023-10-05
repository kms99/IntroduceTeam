// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

// Firebase 구성 정보 설정
const firebaseConfig = {
  apiKey: "AIzaSyBCRtnQasPnOrIwbSAfN2gQdWYqrkiwMzg",
  authDomain: "sparta-c48a5.firebaseapp.com",
  projectId: "sparta-c48a5",
  storageBucket: "sparta-c48a5.appspot.com",
  messagingSenderId: "823259035177",
  appId: "1:823259035177:web:2efbea644a5e0710a30e38",
  measurementId: "G-P79TQTLFWQ",
};

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export function googleLogin() {
  return signInWithPopup(auth, provider).then((result) => {
    const user = result.user;
    console.log("로그인성공이요");
    return user;
  });
}

export function logOut() {
  return signOut(auth)
    .then(() => {
      console.log("로그아웃 성공");
    })
    .catch((error) => {
      console.error(error);
    });
}

export function getUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        unsubscribe();
        resolve(user);
      } else {
        resolve(null);
      }
    });
  });
}
