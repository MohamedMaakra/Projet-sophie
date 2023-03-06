const getData = async () => {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    if (!response.ok) {
      throw new Error("Erreur de réponse du serveur");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Une erreur s'est produite", error);
    throw error;
  }
};

async function main() {
  try {
    const data = await getData();
    const filters = await getDataFilter();
    displayData(data);
    displayData(filters);
  } catch (error) {
    console.error("Une erreur s'est produite", error);
  }
}

function displayData(data) {
  const sectionGallery = document.getElementById("gallery");

  for (let elem of data) {
    const figure = document.createElement("figure");
    const imageElement = document.createElement("img");
    imageElement.src = elem.imageUrl;
    const nomElement = document.createElement("figcaption");
    nomElement.textContent = elem.title;

    figure.appendChild(imageElement);
    figure.appendChild(nomElement);
    sectionGallery.appendChild(figure);
  }
  //console.log(data);
}

// Filtres //
const getDataFilter = async () => {
  try {
    const response = await fetch("http://localhost:5678/api/categories");
    if (!response.ok) {
      throw new Error("Erreur de réponse du serveur");
    }
    const dataF = await response.json();
    //console.log(dataF);
    return dataF;
  } catch (error) {
    console.error("Une erreur s'est produite", error);
    throw error;
  }
};

main();

// Button //
const boutonFilter = document.querySelector(".filter-objets");
boutonFilter.addEventListener("click", async () => {
  try {
    const data = await getData();
    const objetsFilter = data.filter((elem) => elem.categoryId === 1);
    const sectionGallery = document.getElementById("gallery");
    sectionGallery.innerHTML = ""; // Vider le contenu de la sectionGallery
    displayData(objetsFilter); // Afficher uniquement les éléments filtrés
  } catch (error) {
    console.error("Une erreur s'est produite", error);
  }
});

const boutonObjet = document.querySelector(".filter-objets");
boutonFilter.addEventListener("click", async () => {
  try {
    const data = await getData();
    const objetsFilter = data.filter((elem) => elem.categoryId === 1);
    //console.log(objetsFilter);
    const sectionGallery = document.getElementById("gallery");
    sectionGallery.innerHTML = ""; // Vider le contenu de la sectionGallery
    displayData(objetsFilter); // Afficher uniquement les éléments filtrés
  } catch (error) {
    console.error("Une erreur s'est produite", error);
  }
});
const boutonApp = document.querySelector(".filter-appartements");
boutonApp.addEventListener("click", async () => {
  try {
    const data = await getData();
    const appFilter = data.filter((elem) => elem.categoryId === 2);
    //console.log(appFilter);
    const sectionGallery = document.getElementById("gallery");
    sectionGallery.innerHTML = ""; // Vider le contenu de la sectionGallery
    displayData(appFilter); // Afficher uniquement les éléments filtrés
  } catch (error) {
    console.error("Une erreur s'est produite", error);
  }
});
const boutonHotel = document.querySelector(".filter-hotelsrestaurants");
console.log(boutonHotel);
boutonHotel.addEventListener("click", async () => {
  try {
    const data = await getData();
    const hotelFilter = data.filter((elem) => elem.categoryId === 3);
    //console.log(hotelFilter);
    const sectionGallery = document.getElementById("gallery");
    sectionGallery.innerHTML = ""; // Vider le contenu de la sectionGallery
    displayData(hotelFilter); // Afficher uniquement les éléments filtrés
  } catch (error) {
    console.error("Une erreur s'est produite", error);
  }
});
const boutonTous = document.querySelector(".filter-tous");
boutonTous.addEventListener("click", async () => {
  const sectionGallery = document.getElementById("gallery");
  const data = await getData();
  sectionGallery.innerHTML = "";
  displayData(data);
});

// login//
const log = document.querySelector("#log");
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
});
