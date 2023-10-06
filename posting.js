import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-storage.js";

// Firebase 구성 정보 설정
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

//firebase-storage
const storage = getStorage(app);
//루트 > images
const storageRef = ref(storage);
const imagesRef = ref(storageRef, "images");



let reset = document.getElementById('reset')

reset.addEventListener('click', function(event) {
  let Confirmed = confirm('초기화하시겠습니까?');

  if (Confirmed){
    document.getElementByI('reset');
} else {
    event.preventDefault();
  }});
  
// 파이어스토어 데이터추가
$("#posting-btn").click(async function () {
  let name = $("#name").val();
  let living = $("#living").val();
  let MBTI = $("#MBTI").val();
  let blog = $("#blog").val();
  let git = $("#git").val();
  let turn = $("#turn").val();
  let goal = $("#goal").val();
  let firstSalary = $("#firstSalary").val();
  let Advantages = $("#Advantages").val();
  let collabo = $("#collabo").val();

  let doc = {
    name: name,
    living: living,
    MBTI: MBTI,
    blog: blog,
    git: git,
    turn: turn,
    goal: goal,
    firstSalary: firstSalary,
    Advantages: Advantages,
    collabo: collabo,
  };

  async function add(doc) {
    await addDoc(collection(db, "member-cards"), doc);
    alert("저장완료!");
    window.location.reload();
  }

  // 이미지 firebase-storage 저장
  const image = document.getElementById("images").files[0];

  //firebase-storage
  const storageRef = ref(imagesRef, image.name);
  uploadBytes(storageRef, image).then((snapshot) => {
    getDownloadURL(ref(storageRef)).then((url) => {
      doc["imagePath"] = url;
      if (
        !image ||
        !name ||
        !living ||
        !MBTI ||
        !blog ||
        !git ||
        !goal ||
        !firstSalary ||
        !Advantages ||
        !collabo
      ) {
        alert("내용을 모두 입력해주세요.");
      } else {
        add(doc);
      }
    });
  });
});

// 파베 데이터 가져오기
let docs = await getDocs(collection(db, "member-cards"));
docs.forEach((doc) => {
  let row = doc.data();

  let imagePath = row["imagePath"];
  let name = row["name"];
  let mbti = row["MBTI"];

  let temp_html = `
<div class="flip">
<div class="card" data-code-id="${doc.id}">
<div class="front">
<img
src="${imagePath}" />
</div>
<div class="back">
<div class="card-name">${name}</div>
<div class="card-contents">"${mbti}"</div>
</div>
</div>
</div>`;
  $("#card").append(temp_html);
});

function openclose() {
  $("#postingbox").toggle();
}
// 토글 버튼과 숨겨진 콘텐츠를 가져오기
const toggleButton = document.getElementById("toggleButton");
const hiddenContent = document.getElementById("hiddenContent");
const closeButton = document.getElementById("closeButton");

// 토글 버튼 클릭 시 이벤트 처리
toggleButton.addEventListener("click", function () {
  // 토글 버튼 숨기기
  toggleButton.style.display = "none";
  // 숨겨진 콘텐츠 보이기
  hiddenContent.style.display = "block";
});

// 닫기 버튼 클릭 시 이벤트 처리
closeButton.addEventListener("click", function () {
  // 숨겨진 콘텐츠 숨기기
  hiddenContent.style.display = "none";
  // 토글 버튼 보이기
  toggleButton.style.display = "block";
});

document.querySelectorAll(".card").forEach((item) => {
  item.addEventListener("click", function () {
    window.location.href = `./detail.html?${item.dataset.codeId}`;
  });
});
