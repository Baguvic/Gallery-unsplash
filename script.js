const accsessKey = "up5OJjwQ1TE8D9q6gB8meZY6kccdwwpeKUsA5iUXio8";

const formElement = document.querySelector("form");
const inputSearch = document.getElementById("search");
const btnSearch = document.getElementById("submit");
const galeriList = document.querySelector(".galeri-list");
const moreFoto = document.getElementById("push-more");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = inputSearch.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accsessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  const result = data.results;
  if (page === 1) {
    galeriList.innerHTML = "";
  }

  result.map((result) => {
    const card = document.createElement("div");
    card.classList.add("card");
    const img = document.createElement("img");
    img.src = result.urls.small;
    img.alt = result.alt_description;
    const linkImg = document.createElement("a");
    linkImg.href = result.links.html;
    linkImg.target = "_blank";
    linkImg.textContent = result.alt_description;

    card.append(img, linkImg);
    galeriList.appendChild(card, img, linkImg);
  });

  page++;
  if (page > 1) {
    moreFoto.style.display = "block";
  }
}
formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});
moreFoto.addEventListener("click", () => {
  searchImages();
});
