const button = document.querySelector(".section__button");
const input = document.querySelector(".section__input");
const accessKey = "ykQYStvp6IvpsQfYz0F2sEQZ5ucHwbSojspNXyw0gz8";
const container = document.querySelector(".section__creat");
const img = document.createElement("img");
container.appendChild(img);
const text = document.createElement("p");
text.textContent = "Загрузка...";
container.appendChild(text);
const textEror = document.createElement("p");
container.appendChild(textEror);
async function search() {
  try {
    text.style.display = "block";
    img.style.display = "none";
    const image = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${accessKey}&query=${input.value}`
    );
    const dataImg = await image.json();
    console.log(dataImg);
    if (dataImg && dataImg.urls) {
      img.src = dataImg.urls.regular;
      img.onload = () => {
        text.style.display = "none";
        img.style.display = "block";
      };
    } else {
      text.style.display = "block";
    }
  } catch (error) {
    console.log("чет пошло не так");
  }
}
button.addEventListener("click", () => {
  search();
});
