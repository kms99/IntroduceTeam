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
  updateDoc,
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

  function blogIcon() {
    if (blog.includes("tistory")) {
      let url = "./img/blog/tistory 로고.jpeg";
      return url;
    } else if (blog.includes("velog")) {
      let url = "./img/blog/velog.jpeg";
      return url;
    } else if (blog.includes("naver")) {
      let url = "./img/blog/naverblog.jpeg";
      return url;
    }
  }

  document.getElementById("member-image").src = imagePath;
  document.getElementById("member-name").innerHTML = name;
  document.getElementById("member-region").innerHTML = living;
  document.getElementById("member-mbti").innerHTML = MBTI;
  document.getElementById("member-blog").href = blog;
  document.getElementById("blog-img").src = blogIcon();
  document.getElementById("member-github").href = git;
  document.getElementById("github-img").src = "./img/github.jpeg";
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
  await deleteDoc(doc(db, `${queryString}-guest-book`, docId));
  await window.location.reload();
}

// 로딩 시 댓글 데이터 불러오기
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
  <img src="./icon/edit.svg" class="edit-btn" data-code-id="${doc.id}">
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

//댓글 수정 이벤트
//수정버튼 클릭했을때 수정가능한 textarea와 수정확인 버튼나옴
const editDOM = document.querySelectorAll(".edit-btn");
editDOM.forEach((item) => {
  item.addEventListener("click", (e) => startEdit(e, item.dataset.codeId));
});

//수정 이모티콘을 눌렀을때
const startEdit = (e, docId) => {
  console.log(e.target);
  if (e.target.classList.contains("edit-btn")) {
    const guestCommentDiv = e.target.closest(".guest-comment"); // 부모 요소를 찾습니다.

    // 수정 중 잠시 edit, 삭제 아이콘 없앰
    e.target.style.display = "none";
    guestCommentDiv.querySelector(".delete-btn").style.display = "none";

    // 삭제된 이미지 자리에 버튼 요소를 생성
    const confirm_btn = document.createElement("button");
    const cancel_btn = document.createElement("button");
    confirm_btn.textContent = "확인"; // 원하는 버튼 텍스트 추가
    confirm_btn.classList = "ok-edit";
    cancel_btn.textContent = "취소";
    cancel_btn.classList = "cancel-edit";
    // 버튼에 클릭 이벤트 리스너 추가 등 원하는 작업 수행

    // 삭제된 이미지 자리에 수정확인, 수정취소버튼을 삽입
    if (guestCommentDiv) {
      guestCommentDiv.insertBefore(
        confirm_btn,
        guestCommentDiv.querySelector(".edit-btn")
      );
      guestCommentDiv.insertBefore(
        cancel_btn,
        guestCommentDiv.querySelector(".edit-btn")
      );
    }

    //수정 textarea 생성
    let newText = e.target.closest(".guest-comment").querySelector(".comment");
    const newTextArea = document.createElement("textarea");
    newTextArea.textContent = newText.innerHTML;
    newText.style.display = "none";
    newTextArea.classList = "edit-textarea";
    e.target.closest(".guest-comment").appendChild(newTextArea);

    //수정 취소 버튼을 눌렀을 때
    cancel_btn.addEventListener("click", () => {
      cancel_btn.style.display = "none";
      confirm_btn.style.display = "none";
      e.target.style.display = "flex";
      guestCommentDiv.querySelector(".delete-btn").style.display = "flex";
      newTextArea.remove();
      newText.style.display = "flex";
    });

    //수정 확인 버튼 눌렀을 때
    confirm_btn.addEventListener("click", async () => {
      e.preventDefault();
      //수정값을 서버로 보냄
      console.log(docId);
      const updateRef = doc(db, `${queryString}-guest-book`, docId);
      await updateDoc(updateRef, {
        comment: newTextArea.value,
      });
      await window.location.reload();
    });
  }
};

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
