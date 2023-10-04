// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Firebase 구성 정보 설정
const firebaseConfig = {
  apiKey: "AIzaSyAD7_3LxaA9uDZDmPUpUr37OkCxYHD-s9w",
  authDomain: "bul4jo-56a8e.firebaseapp.com",
  projectId: "bul4jo-56a8e",
  storageBucket: "bul4jo-56a8e.appspot.com",
  messagingSenderId: "1061622010722",
  appId: "1:1061622010722:web:20ff947c870385a607123b",
  measurementId: "G-BCC52D5DHX",
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
