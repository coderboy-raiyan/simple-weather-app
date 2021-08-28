const inputBox = document.querySelector(".input-box");
const searchBtn = document.querySelector(".search-btn");
const cityName = document.querySelector(".city-name");
const temp = document.querySelector(".temp");
const iconImg = document.querySelector(".icon-img");
const word = document.querySelector(".word");
const loader = document.querySelector(".loader");
const sorryMsg = document.querySelector(".sorry-msg");

function alwaysShow() {
  let url = `https://api.weatherapi.com/v1/current.json?key=7489c7043a2747328d255557212808&q=Bangladesh`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showOn(data));
}

function showOn(data) {
  cityName.innerHTML = data.location.name;
  temp.innerHTML = data.current.temp_c;
  iconImg.setAttribute("src", `${data.current.condition.icon}`);
  word.innerHTML = data.current.condition.text;
}
alwaysShow();

searchBtn.addEventListener("click", function () {
  if (inputBox.value == "") {
    return alert("Type something");
  }
  sorryMsg.classList.add("d-none");
  let mySerach = inputBox.value.trim().toLowerCase();
  inputBox.value = "";
  let url = `http://api.weatherapi.com/v1/current.json?key=7489c7043a2747328d255557212808&q=${mySerach}`;
  fetch(url)
    .then((res) => {
      loader.classList.remove("d-none");
      if (res.status == 200) {
        setTimeout(() => {
          loader.classList.add("d-none");
        }, 500);
        return res.json();
      }
    })
    .then((data) => getData(data))
    .catch((err) => {
      errorMsg(err);
    });
});

function errorMsg(err) {
  if (err) {
    sorryMsg.classList.remove("d-none");
    loader.classList.add("d-none");
  }
  console.log(err);
}

function getData(data) {
  cityName.innerHTML = data.location.name;
  temp.innerHTML = data.current.temp_c;
  iconImg.setAttribute("src", `${data.current.condition.icon}`);
  let conditionWord = data.current.condition.text;
  if (conditionWord.includes("rain")) {
    document.body.style.background =
      "url('https://images.unsplash.com/photo-1438449805896-28a666819a20?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80')";
  } else if (conditionWord.includes("Sunny")) {
    document.body.style.background =
      "url('https://images.unsplash.com/photo-1592210454359-9043f067919b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80')";
  } else {
    document.body.style.background =
      "url('https://images.unsplash.com/photo-1584559759045-d5062ca44f09?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1548&q=80')";
  }

  word.innerHTML = data.current.condition.text;
  console.log(data, conditionWord);
}
