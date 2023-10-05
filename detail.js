import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";
import {
  orderBy,
  query,
  addDoc,
  collection,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

// firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBCRtnQasPnOrIwbSAfN2gQdWYqrkiwMzg",
  authDomain: "sparta-c48a5.firebaseapp.com",
  projectId: "sparta-c48a5",
  storageBucket: "sparta-c48a5.appspot.com",
  messagingSenderId: "823259035177",
  appId: "1:823259035177:web:2efbea644a5e0710a30e38",
  measurementId: "G-P79TQTLFWQ",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//페이지 쿼리스트링 값 가져오기
let queryString = window.location.search.substring(1);
console.log(queryString);

// 쿼리스트링 값으로 파이어스토어 데이터 가져오기
const docRef = doc(db, "member-cards", `${queryString}`);
const docSnap = await getDoc(docRef);
if (docSnap.exists()) {
  const memberData = docSnap.data();
  const {
    Advantages,
    MBTI,
    blog,
    collabo,
    firstSalary,
    git,
    goal,
    imagePath,
    living,
    name,
    turn,
  } = memberData;

  document.getElementById("member-image").src = imagePath;
  document.getElementById("member-name").innerHTML = name;
  document.getElementById("member-region").innerHTML = living;
  document.getElementById("member-mbti").innerHTML = MBTI;
  document.getElementById("member-blog").href = blog;
  document.getElementById("member-blog").innerHTML = "이동";
  document.getElementById("member-github").href = git;
  document.getElementById("member-github").innerHTML = "이동";
  document.getElementById("question-goal").innerHTML = goal;
  document.getElementById("question-collabo").innerHTML = collabo;
  document.getElementById("question-firstSalary").innerHTML = firstSalary;
  document.getElementById("question-Advantages").innerHTML = Advantages;
  document.getElementById("question-reason").innerHTML = turn;
}

//홈버튼
document.getElementById("home-btn").addEventListener("click", function () {
  window.localStorage.clear();
  window.location.href = "./index.html";
});

// 데이터베이스 데이터 저장
async function connectDatabase(user, comment, currentDate) {
  try {
    await addDoc(collection(db, `${queryString}-guest-book`), {
      user: user,
      comment: comment,
      currentDate: currentDate,
    });
    await window.location.reload();
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// 데이터베이스 삭제
async function deleteDatabase(docId) {
  await deleteDoc(doc(db, `${userName}-guest-book`, docId));
  await window.location.reload();
}

// 로딩 시 데이터 불러오기
let innerHtml = "";
let count = 1;
const q = query(
  collection(db, `${queryString}-guest-book`),
  orderBy("currentDate", "asc")
);
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  const { user, comment, currentDate } = doc.data();
  innerHtml += `<div class="guest-comment">
    <img src="./icon/octicon_x-12.svg" class="delete-btn" data-code-id="${
      doc.id
    }">
    <div class="comment-count">${count++}.</div>
    <div class="guest-name">${user} 님의 댓글 <span class="comment-date">(${currentDate})</span></div>
    <div class="comment">${comment}</div>
    </div>`;
  document.getElementById("guest-book-list").innerHTML = innerHtml;
});

// 댓글 작성 이벤트
document
  .getElementById("guest-comment-form")
  .addEventListener("submit", function (e) {
    const user = document.getElementById("record-user").value;
    const comment = document.getElementById("record-comment").value;
    if (!user && !comment) {
      alert("입력된 내용이 없습니다.");
      e.preventDefault();
      return;
    } else if (!user) {
      alert("작성자를 입력하세요.");
      e.preventDefault();
      return;
    } else if (!comment) {
      alert("내용을 입력하세요.");
      e.preventDefault();
      return;
    }

    const date = new Date();
    const currentDate = `${date.getFullYear().toString().slice(-2)}/${(
      "0" +
      (date.getMonth() + 1)
    ).slice(-2)}/${("0" + date.getDate()).slice(-2)} ${(
      "0" + date.getHours()
    ).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}:${(
      "0" + date.getSeconds()
    ).slice(-2)}`;
    connectDatabase(user, comment, currentDate);
    e.preventDefault();
  });

// 댓글 삭제 이벤트
document.querySelectorAll(".delete-btn").forEach((item) => {
  item.addEventListener("click", function () {
    let deleteConfirm = confirm("해당 댓글을 삭제하시겠습니까?");
    if (deleteConfirm) {
      deleteDatabase(item.dataset.codeId);
    }
  });
});

// dark-mode
document.getElementById("dark-mode").addEventListener("click", function () {
  document.querySelector("body").classList.add("dark-mode");
  document.querySelectorAll("a").forEach((item) => {
    item.classList.add("a-dark-mode");
  });
  document.getElementById("dark-mode").src = "./icon/ph_moon-bold-w.svg";
  document.getElementById("light-mode").src = "./icon/ph_sun-bold-w.svg";
  document.getElementById("home-btn").src = "./icon/ion_home-outline-w.svg";
  document.querySelectorAll(".delete-btn").forEach((item) => {
    item.src = "./icon/octicon_x-12-w.svg";
  });
});
// light-mode
document.getElementById("light-mode").addEventListener("click", function () {
  document.querySelector("body").classList.remove("dark-mode");
  document.querySelectorAll("a").forEach((item) => {
    item.classList.remove("a-dark-mode");
  });
  document.getElementById("dark-mode").src = "./icon/ph_moon-bold.svg";
  document.getElementById("light-mode").src = "./icon/ph_sun-bold.svg";
  document.getElementById("home-btn").src = "./icon/ion_home-outline.svg";
  document.querySelectorAll(".delete-btn").forEach((item) => {
    item.src = "./icon/octicon_x-12.svg";
  });
});
