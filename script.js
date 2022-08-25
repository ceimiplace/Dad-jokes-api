const jokes = document.querySelector(".jokes");
const getJokes = document.querySelector(".get-jokes");
const getImage = document.querySelector(".get-image");
const imageJoke = document.querySelector(".image-joke");
const textJoke = document.querySelector(".text-joke");
const search = document.querySelector(".search");
const input = document.querySelector("input");

class GetData {
  constructor(url) {
    this.url = url;
  }
  get() {
    return fetch(`${this.url}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }).then((resp) => resp.json());
  }
}
const DadApiJoke = new GetData("https://icanhazdadjoke.com/");

// this is basic way that i impremented it , but i refractored it using classes
/*function getData() {
  fetch("https://icanhazdadjoke.com/", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      imageJoke.src = "";
      textJoke.textContent = data.joke;
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
      textJoke.textContent = "";
      imageJoke.src = `https://icanhazdadjoke.com/j/${data.id}.png`;
    });
}*/
getJokes.addEventListener("click", () => {
  DadApiJoke.get().then((data) => {
    imageJoke.src = "";
    textJoke.textContent = data.joke;
  });
});
getImage.addEventListener("click", () => {
  DadApiJoke.get().then((data) => {
    textJoke.textContent = "";
    imageJoke.src = `https://icanhazdadjoke.com/j/${data.id}.png`;
  });
});

fetch("https://icanhazdadjoke.com/search?term='dad'", {
  method: "GET",
  headers: {
    Accept: "application/json",
  },
})
  .then((resp) => resp.json())
  .then((data) => console.log(data));
// adding search ui
search.addEventListener("click", () => {
  if (input.classList.contains("hide") == true) {
    input.disabled = false;
    input.classList.remove("hide");
  } else {
    input.disabled = true;
    input.classList.add("hide");
  }
});
