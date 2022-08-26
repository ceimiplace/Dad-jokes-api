const jokes = document.querySelector(".jokes");
const getJokes = document.querySelector(".get-jokes-btn");
const getImage = document.querySelector(".get-image-btn");
const imageJoke = document.querySelector(".image-joke");
const textJoke = document.querySelector(".text-joke");
const search = document.querySelector(".get-search-btn");
const widgets = document.querySelector(".widgets");
const input = widgets.querySelector("input");
const searchResults = document.querySelector(".search-results");
class GetData {
  constructor(url) {
    this.url = url;
    this.currentPageJoke = 1;
  }
  get(endpoint) {
    return fetch(this.url + endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }).then((resp) => resp.json());
  }
}
const DadApiJoke = new GetData("https://icanhazdadjoke.com/");

getJokes.addEventListener("click", () => {
  DadApiJoke.get("").then((data) => {
    imageJoke.src = "";
    textJoke.textContent = data.joke;
  });
});
getImage.addEventListener("click", () => {
  DadApiJoke.get("").then((data) => {
    textJoke.textContent = "";
    imageJoke.src = `https://icanhazdadjoke.com/j/${data.id}.png`;
  });
});

search.addEventListener("click", () => {
  if (widgets.classList.contains("hide")) {
    widgets.classList.remove("hide");
    input.disabled = false;
  } else {
    input.disabled = true;
    widgets.classList.add("hide");
  }
});

const searching = document.querySelector(".srch-btn");
searching.addEventListener("click", () => {
  DadApiJoke.currentPageJoke = 1;
  searchApi();
});
function searchApi() {
  DadApiJoke.get(
    `search?term=${input.value}&limit=10&page=${DadApiJoke.currentPageJoke}`
  )
    .then((data) => {
      return new Promise((resolve, reject) => {
        if (data.total_jokes > 0) {
          resolve(data);
        } else {
          reject("No jokes found");
        }
      });
    })
    .then((data) => {
      searchResults.textContent = "";
      let dataResults = data.results;
      dataResults.forEach((element) => {
        let appendeble = document.createElement("div");
        appendeble.textContent = element.joke;
        searchResults.append(appendeble);
      });
      return new Promise((resolve) => resolve(data));
    })
    .then((data) => {
      console.log(data);
      let span1 = document.createElement("span");
      span1.innerHTML = `<i class="fa-solid fa-circle-arrow-left previous-search" ></i>`;
      span1.addEventListener("click", () => {
        DadApiJoke.currentPageJoke--;
        searchApi();
      });
      let span2 = document.createElement("span");
      span2.innerHTML = `<i class="fa-solid fa-circle-arrow-right next-search"></i>`;
      span2.addEventListener("click", () => {
        DadApiJoke.currentPageJoke++;
        searchApi();
      });
      let divs = document.createElement("div");
      divs.style.display = "flex";
      divs.style.justifyContent = "space-between";

      divs.append(span1, span2);
      searchResults.appendChild(divs);
    })
    .catch((err) => {
      searchResults.style.justifyContent = "center";
      searchResults.innerHTML = `<div>No jokes found <i class="fa-solid fa-face-sad-tear"></i></div>`;
    });
}
