document.getElementById("lightMode_btn").addEventListener('click',function(){
  document.getElementById("darkMode_btn").src="./img/dark.png";
  document.getElementById("lightMode_btn").src="./img/light.png";
  document.querySelector("body").style.background="white";
  document.querySelector("body").style.color="black";
})

document.getElementById("darkMode_btn").addEventListener('click',function(){
  document.getElementById("darkMode_btn").src="./img/dark(dark).png";
  document.getElementById("lightMode_btn").src="./img/light(dark).png";
  document.querySelector("body").style.background="black";
  document.querySelector("body").style.color="white";
})

