"use strict";
import { getUser, googleLogin, logOut } from "./firebase.js";

//HTML DOM들 변수에 저장
const checkDustDom = document.querySelector(".check-dust");
const nameDustSpanDom = document.querySelector(".name-dust span");
const nameDustDom = document.querySelector(".name-dust");
const loginDom = document.querySelector(".header-login");
const greetingDom = document.querySelector(".header-greeting");
let user = null;
let userLogin = false;

//header 상단 미세먼지 농도 데이터 불러와서 동적으로 HTML작성
function addWeather() {
  let url = "http://spartacodingclub.shop/sparta_api/seoulair";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let rows = data.RealtimeCityAir.row;
      rows.forEach((row) => {
        if (row.IDEX_MVL > 40) {
          let name = row.MSRSTE_NM;
          let dust = row.IDEX_MVL;

          let temp_html = `<li>${name} : ${dust}</li>`;
          $("#name-dust-bad").append(temp_html);
        } else {
          let name = row.MSRSTE_NM;
          let dust = row.IDEX_MVL;

          let temp_html = `<li>${name} : ${dust}</li>`;
          $("#name-dust-pure").append(temp_html);
        }
      });
    });
}

addWeather();

//로그인 유무에 따른 안내인사
function handleGreeting() {
  if (userLogin) {
    let html = `${user.displayName}님 반가워요!`;
    greetingDom.innerText = html;
  }
  if (!userLogin) {
    greetingDom.innerText = "";
  }
}

//visible 상태에 따라 모달창 toggle
let visible = false;
const handleDust = () => {
  if (!visible) nameDustDom.style.display = "flex";
  else nameDustDom.style.display = "none";
  visible = !visible;
};

//구글 로그인 시 user변수에 유저 정보 담기
const handleLogin = async (e) => {
  e.preventDefault();

  if (e.target.innerText === "Google Login") {
    //구글로그인
    try {
      await googleLogin().then((result) => (user = result));
      if (user.displayName) {
        userLogin = true;
        loginDom.innerText = "로그아웃";
        handleGreeting();
      }
    } catch (err) {
      console.log("로그인 에러발생", err);
    }
  } else if (e.target.innerText === "로그아웃") {
    const ok = confirm("로그아웃 하시겠습니까?");
    if (ok) {
      try {
        await logOut();
        user = null;
        userLogin = false;
        loginDom.innerText = "Google Login";
        handleGreeting();
      } catch (err) {
        console.log("로그아웃 에러발생", err);
      }
    }
  }
};

const getUserProfile = async () => {
  const result = await getUser();
  user = result;
  if (result.displayName) {
    userLogin = true;
    loginDom.innerText = "로그아웃";
    handleGreeting();
  }
};

//클릭했을때 기능들
checkDustDom.addEventListener("click", handleDust);
nameDustSpanDom.addEventListener("click", handleDust);
loginDom.addEventListener("click", handleLogin);
document.addEventListener("DOMContentLoaded", getUserProfile);
