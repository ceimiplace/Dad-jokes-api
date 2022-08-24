const jokes = document.querySelector(".jokes");
const getJokes = document.querySelector(".get-jokes");
const getImage = document.querySelector(".get-image");

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
getJokes.addEventListener("click", getData);
