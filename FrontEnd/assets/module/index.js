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
  const categs = document.getElementById("categs");

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

// Button //

// login//
/*const log = document.querySelector("#log");
const login = document.querySelector("#login");
const sections = document.getElementsByTagName("section");

let isModified = false;
let initialStyles = []; // Stocker les styles initiaux des sections

// Stocker les styles initiaux des sections
for (let i = 0; i < sections.length; i++) {
  initialStyles.push(sections[i].style.display);
}
console.log(initialStyles);
log.addEventListener("click", (e) => {
  if (!isModified) {
    // Si la page n'a pas été modifiée
    for (let i = 0; i < sections.length; i++) {
      if (i === 3) {
        break;
      }
      const section = sections[i];
      section.style.display = "none";
      //console.log(section);
    }
    login.style.display = null;

    isModified = true; // Changer l'état de la page à modifié
    //console.log(initialStyles);
  } else {
    // Si la page a déjà été modifiée
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      section.style.display = initialStyles[i]; // Restaurer le style initial
    }
    login.style.display = "none"; // Cacher le login

    isModified = false; // Changer l'état de la page à non modifié
  }
});

let inputEmail = document.querySelector("#email1").value;
let inputPass = document.querySelector("#password").value;
const submit = document.querySelector("submit1");

submit.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log(submit);
  const user = {
    email: inputEmail,
    password: inputPass,
  };
  console.log(user);

  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user }),
    });

    if (!response.ok) {
      throw new Error("Adresse e-mail ou mot de passe invalide");
    }
  } catch (error) {}
});*/
