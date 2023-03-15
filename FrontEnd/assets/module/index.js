const getData = async () => {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    if (!response.ok) {
      throw new Error("Erreur de réponse du serveur");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Une erreur s'est produite", error);
    throw error;
  }
};

async function main() {
  try {
    const data = await getData();
    displayData(data);
    displayCategs(data);
    displayModalData(data);
  } catch (error) {
    console.error("Une erreur s'est produite", error);
  }
}

function displayData(data) {
  const sectionGallery = document.getElementById("gallery");
  let categoryId = [];
  let categories = [];

  for (let elem of data) {
    if (!categoryId.includes(elem.category.id)) {
      categoryId.push(elem.category.id);
      categories.push(elem.category.name);
    }
    const figure = document.createElement("figure");
    figure.setAttribute("id", `figure_${elem.id}`);
    figure.setAttribute("class", "figure");

    // Ajouter l'attribut data-cat
    figure.setAttribute("data-cat", elem.category.id);

    const imageElement = document.createElement("img");
    imageElement.src = elem.imageUrl;
    const nomElement = document.createElement("figcaption");
    nomElement.textContent = elem.title;

    figure.appendChild(imageElement);
    figure.appendChild(nomElement);
    sectionGallery.appendChild(figure);
  }
}

function displayCategs(data) {
  const categs = document.getElementById("categories");

  // Créer le bouton "Tous"
  const allBtn = document.createElement("button");
  allBtn.setAttribute("class", "cat");
  allBtn.textContent = "Tous";
  allBtn.addEventListener("click", () => {
    showAllFigures();
  });
  categs.appendChild(allBtn);

  // Créer un bouton pour chaque catégorie unique
  const categoryId = data.map((elem) => elem.category.id);
  const uniqueCategoryId = categoryId.filter(
    (id, index) => categoryId.indexOf(id) === index
  );

  for (let i in uniqueCategoryId) {
    const category = data.find(
      (elem) => elem.category.id === uniqueCategoryId[i]
    );
    const catBtn = document.createElement("button");
    catBtn.setAttribute("class", "cat");
    catBtn.setAttribute("data-cat", uniqueCategoryId[i]);
    catBtn.textContent = category.category.name;
    catBtn.addEventListener("click", () => {
      showFiguresByCat(uniqueCategoryId[i]);
    });
    categs.appendChild(catBtn);
  }
}

function showAllFigures() {
  const figures = document.querySelectorAll(".figure");
  figures.forEach((fig) => {
    fig.style.display = "block";
  });
}

function showFiguresByCat(catId) {
  const figures = document.querySelectorAll(".figure");
  figures.forEach((fig) => {
    if (fig.getAttribute("data-cat") == catId || catId === "all") {
      fig.style.display = "block";
    } else {
      fig.style.display = "none";
    }
  });
}

function sortByCat(event) {
  const all = document.getElementsByClassName("cat");
  if (event.target.id !== "0") {
    for (let elem of all) {
      if (elem.dataset.cat !== event.target.id) {
        elem.classList.add("hid");
      } else {
        if (elem.classList.contains("hid")) {
          elem.classList.remove("hid");
        }
      }
    }
  } else {
    for (let elem of all) {
      if (elem.classList.contains("hid")) {
        elem.classList.remove("hid");
      }
    }
  }
}
window.addEventListener("DOMContentLoaded", () => {
  main();
  const loginLink = document.querySelector("#log");
  const token = localStorage.getItem("token");

  loginLink.addEventListener("click", (event) => {
    event.preventDefault();
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      loginLink.textContent = "login";
      loginLink.href = "http://127.0.0.1:5500/FrontEnd/login.html";
      hideElementsWithClass();
    } else {
      window.location.href = "http://127.0.0.1:5500/FrontEnd/login.html";
    }
  });
  if (token) {
    loginLink.textContent = "logout";
    loginLink.href = "#";
    showElementsWithClass();
  } else {
    hideElementsWithClass();
  }
});

function showElementsWithClass() {
  const elements = document.querySelectorAll(".display");
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.display = "block";
  }
}

function hideElementsWithClass() {
  const elements = document.querySelectorAll(".display");
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.display = "none";
  }
}
//modal//
let modal = null;

const openModal = function (e, data) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute("href"));
  target.style.display = null;
  target.removeAttribute("aria-hidden");
  modal = target;
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
};

document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);

  modal = null;
};
const stopPropagation = function (e) {
  e.stopPropagation();
};

function displayModalData(data) {
  const modalContent = document.querySelector(".gallery-mod");

  for (let elem of data) {
    const figure = document.createElement("figure");
    figure.setAttribute("id", `modal-figure_${elem.id}`);
    figure.setAttribute("class", "modal-figure");

    const imageElement = document.createElement("img");
    imageElement.src = elem.imageUrl;

    const iconContainer = document.createElement("div");
    iconContainer.classList.add("icon-container");

    const carre = document.createElement("img");
    carre.src = "./assets/icons/Rectangle.png";
    iconContainer.appendChild(carre);

    const delet = document.createElement("img");
    delet.src = "./assets/icons/delete.png";
    iconContainer.appendChild(delet);

    const nomElement = document.createElement("figcaption");
    nomElement.textContent = "édite";

    figure.appendChild(imageElement);
    figure.appendChild(nomElement);
    figure.appendChild(iconContainer);

    modalContent.appendChild(figure);
  }
}
