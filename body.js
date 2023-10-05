document.getElementById("lightMode_btn").addEventListener("click", function () {
  document.getElementById("darkMode_btn").src = "./img/dark.png";
  document.getElementById("lightMode_btn").src = "./img/light.png";
  document.querySelector("body").style.background = "white";
  document.querySelector("body").style.color = "black";
  document.querySelector(".header-top").style.backgroundColor = "white";
  document.querySelector(".header-login").style.backgroundColor = "white";
  document.querySelector(".check-dust").style.backgroundColor = "white";
  document.querySelector(".check-dust").style.color = "black";
  document.querySelector(".header-login").style.color = "black";
  document.querySelector(".name-dust").style.backgroundColor = "white";
  document.querySelector(".name-dust").style.border = "1px solid black";
  document.querySelector(".name-dust span").style.color = "black";
});

document.getElementById("darkMode_btn").addEventListener("click", function () {
  document.getElementById("darkMode_btn").src = "./img/dark(dark).png";
  document.getElementById("lightMode_btn").src = "./img/light(dark).png";
  document.querySelector("body").style.background = "black";
  document.querySelector("body").style.color = "white";
  document.querySelector(".header-top").style.backgroundColor = "black";
  document.querySelector(".header-login").style.backgroundColor = "black";
  document.querySelector(".check-dust").style.backgroundColor = "black";
  document.querySelector(".check-dust").style.color = "white";
  document.querySelector(".header-login").style.color = "white";
  document.querySelector(".name-dust").style.backgroundColor = "black";
  document.querySelector(".name-dust").style.border = "1px solid gray";
  document.querySelector(".name-dust span").style.color = "white";
});
