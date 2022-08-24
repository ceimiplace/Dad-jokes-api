const jokes = document.querySelector(".jokes");
const getJokes = document.querySelector(".get-jokes");
const getImage = document.querySelector(".get-image");
const image = document.querySelector(".image");
function getData() {
  fetch("https://icanhazdadjoke.com/", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      jokes.textContent = data.joke;
    });
}
function getImg() {
  fetch("https://icanhazdadjoke.com/", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      image.src = `https://icanhazdadjoke.com/j/${data.id}.png`;
    });
}
getJokes.addEventListener("click", getData);
getImage.addEventListener("click", getImg);
