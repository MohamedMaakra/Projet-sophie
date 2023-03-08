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
  const uniqueCategoryId = [...new Set(categoryId)];

  for (let id of uniqueCategoryId) {
    const category = data.find((elem) => elem.category.id === id);
    const catBtn = document.createElement("button");
    catBtn.setAttribute("class", "cat");
    catBtn.setAttribute("data-cat", id);
    catBtn.textContent = category.category.name;
    catBtn.addEventListener("click", () => {
      showFiguresByCat(id);
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

main();

// login//
const loginLink = document.querySelector("#log");
const token = localStorage.getItem("token");
if (token) {
  loginLink.textContent = "logout";
  loginLink.href = "#";
}

loginLink.addEventListener("click", () => {
  event.preventDefault();
  if (token) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    loginLink.textContent = "login";
    loginLink.href = "http://127.0.0.1:5500/FrontEnd/login.html";
  } else {
    window.location.href = "http://127.0.0.1:5500/FrontEnd/login.html";
  }
});
