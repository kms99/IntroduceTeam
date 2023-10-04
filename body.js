function darkMode(){
    var body = document.body;
    body.classList.toggle("dark-mode");

    var button = document.getElementById("button");
    if(button.innerHTML =="Dark Mode") {
      button.innerHTML = "Light Mode";
    } else {
      button.innerHTML = "Dark Mode"
    }
  }

  document.getElementById('dark-mode-btn').addEventListener('click',darkMode);