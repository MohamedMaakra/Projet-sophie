/**
 *  permet de récupérer des données à partir d'une API qui effectue une requête avec fetch et renvoie une promesse résolue avec les données JSON récupérées.
 * @returns
 */

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
/**
   elle attend la promesse de getDate pour ensuite  appeler d'autre fonction avec comme parametre les données de getData 
   */
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
/**
 * cette focntion et ultiliser pour afficher les données dans un section HTML
 */
function displayData(data) {
  const sectionGallery = document.getElementById("gallery");
  let categoryId = []; //stocke les identifiants et les noms de catégorie uniques des éléments de données fournis.
  let categories = [];

  for (let elem of data) {
    if (!categoryId.includes(elem.category.id)) {
      categoryId.push(elem.category.id);
      categories.push(elem.category.name);
    }
    displayFigure(elem, sectionGallery);
  }
}
/**
 * Cette fonction  est utilisée pour afficher les données dans une section HTML .
 * @param {*} elem
 * @param {*} sectionGallery
 */
function displayFigure(elem, sectionGallery) {
  const figure = document.createElement("figure");
  figure.setAttribute("id", `figure_${elem.id}`);
  figure.setAttribute("class", "figure");

  // Ajouter l'attribut data-cat
  figure.setAttribute("data-cat", elem.categoryId);

  const imageElement = document.createElement("img");
  imageElement.src = elem.imageUrl;
  const nomElement = document.createElement("figcaption");
  nomElement.textContent = elem.title;

  figure.appendChild(imageElement);
  figure.appendChild(nomElement);
  sectionGallery.appendChild(figure);
}
/**
 * La fonction displayCategs crée des boutons et des options pour chaque catégorie unique présente dans les données, et les ajoute à la section "categories" du HTML, ainsi qu'au select avec l'id "modal-cat".
 * @param {array} data - les données contenant les informations sur les figures
 */
function displayCategs(data) {
  // Récupère la section "categories" du HTML
  const categs = document.getElementById("categories");

  // Récupère le select avec l'id "modal-cat"
  const selectCategs = document.getElementById("modal-cat");

  // Créer le bouton "Tous"
  const allBtn = document.createElement("button");
  allBtn.setAttribute("class", "cat");
  allBtn.textContent = "Tous";
  allBtn.addEventListener("click", () => {
    showAllFigures();
  });
  // Ajoute le bouton "Tous" à la section "categories"
  categs.appendChild(allBtn);

  // Créer un bouton et une option pour chaque catégorie unique
  const categoryId = data.map((elem) => elem.category.id);
  const uniqueCategoryId = categoryId.filter(
    (id, index) => categoryId.indexOf(id) === index
  );

  // Parcourt chaque catégorie unique et crée un bouton et une option correspondants
  for (let i in uniqueCategoryId) {
    // Récupère les informations sur la catégorie
    const category = data.find(
      (elem) => elem.category.id === uniqueCategoryId[i]
    );

    // Créer un bouton pour chaque catégorie unique
    const catBtn = document.createElement("button");
    catBtn.setAttribute("class", "cat");
    catBtn.setAttribute("data-cat", uniqueCategoryId[i]);
    catBtn.textContent = category.category.name;
    catBtn.addEventListener("click", () => {
      showFiguresByCat(uniqueCategoryId[i]);
    });
    // Ajoute le bouton à la section "categories"
    categs.appendChild(catBtn);

    // Créer une option pour chaque catégorie unique et l'ajouter au select avec l'id "modal-cat"
    const option = document.createElement("option");
    option.text = category.category.name;
    option.value = uniqueCategoryId[i];
    selectCategs.add(option);
  }
}

/**
 * La fonction showAllFigures affiche toutes les figures en modifiant la valeur de leur propriété CSS "display" à "block".
 */
function showAllFigures() {
  // Récupère toutes les figures
  const figures = document.querySelectorAll(".figure");
  // Parcourt chaque figure et change sa propriété CSS "display" à "block" pour l'afficher
  figures.forEach((fig) => {
    fig.style.display = "block";
  });
}

/**
 * La fonction showFiguresByCat affiche les figures correspondant à la catégorie spécifiée en modifiant la valeur de leur propriété CSS "display" à "block".
 * @param {string} catId - l'identifiant de la catégorie à afficher
 */
function showFiguresByCat(catId) {
  // Récupère toutes les figures
  const figures = document.querySelectorAll(".figure");
  // Parcourt chaque figure et change sa propriété CSS "display" en fonction de son attribut "data-cat"
  figures.forEach((fig) => {
    if (fig.getAttribute("data-cat") == catId || catId === "all") {
      fig.style.display = "block";
    } else {
      fig.style.display = "none";
    }
  });
}

// Cette fonction prend un événement en argument (normalement, un événement de clic sur un élément HTML).
function sortByCat(event) {
  // On sélectionne tous les éléments HTML ayant la classe "cat" et on les met dans un tableau.
  const all = document.getElementsByClassName("cat");

  // Si l'élément qui a déclenché l'événement de clic a un ID différent de "0"
  if (event.target.id !== "0") {
    // ...on boucle sur tous les éléments de la liste...
    for (let elem of all) {
      // ...et si l'élément ne correspond pas à la catégorie de l'élément cliqué, on lui ajoute la classe "hid" pour le masquer.
      if (elem.dataset.cat !== event.target.id) {
        elem.classList.add("hid");
      } else {
        // Sinon, si l'élément correspond bien à la catégorie de l'élément cliqué et s'il a déjà la classe "hid", on la supprime pour l'afficher à nouveau.
        if (elem.classList.contains("hid")) {
          elem.classList.remove("hid");
        }
      }
    }
  } else {
    // Si l'élément cliqué a l'ID "0", on affiche tous les éléments en supprimant la classe "hid" pour chacun d'eux.
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
  let token = localStorage.getItem("token");

  loginLink.addEventListener("click", (event) => {
    event.preventDefault();
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      loginLink.textContent = "login";
      loginLink.href = "./login.html";
      token = false;
      hideElementsWithClass();
    } else {
      window.location.href = "./login.html";
    }
  });
  if (token) {
    loginLink.textContent = "logout";
    loginLink.href = "#";
    showElementsWithClass();
  } else {
    hideElementsWithClass();
  }

  let modal = null;

  const back = document.querySelector(".js-modal-back");

  back.addEventListener("click", () => {
    const modGallery = document.getElementById("modal-gallery");
    const modAjout = document.getElementById("ajouts");
    modGallery.style.display = null;
    modAjout.style.display = "none";
    back.style.visibility = "hidden";
  });
});

// Cette fonction sélectionne tous les éléments HTML ayant la classe "display" et les affiche en utilisant la propriété CSS "display".
function showElementsWithClass() {
  const elements = document.querySelectorAll(".display");
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.display = "block";
  }
}

// Cette fonction sélectionne tous les éléments HTML ayant la classe "display" et les masque en utilisant la propriété CSS "display".
function hideElementsWithClass() {
  const elements = document.querySelectorAll(".display");
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.display = "none";
  }
}

//modal//

// Cette fonction est utilisée pour ouvrir une modal lorsqu'un lien est cliqué.
function openModal(e) {
  e.preventDefault();
  const target = document.getElementById("modal1");

  target.style.display = null;
  target.removeAttribute("aria-hidden"); // On supprime l'attribut "aria-hidden" pour indiquer que la modal est visible.

  target.querySelector(".js-modal-close").addEventListener("click", () => {
    closeModal(target);
  });
}

document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

// Cette fonction est utilisée pour réinitialiser les valeurs des champs du formulaire dans une modal.
function resetModal() {
  const modalForm = document.querySelector("form");
  modalForm.reset();
  const preview = document.getElementById("preview");
  preview.src = "./assets/icons/picture.png";
  const err = document.getElementById("error");
  err.textContent = "";
}

// Cette fonction est utilisée pour fermer une modal ouverte.
function closeModal(modal) {
  console.log(modal);
  const back = document.querySelector(".js-modal-back");
  if (modal === null) return;
  back.click();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);
  resetModal();
  modal = null;
}

const stopPropagation = function (e) {
  e.stopPropagation();
};

// Cette fonction est utilisée pour afficher les données passées en paramètre dans une modal.
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

    // Ajout du gestionnaire d'événements pour la suppression
    delet.addEventListener("click", function () {
      // Récupération de l'identifiant de l'élément à supprimer
      const idToDelete = elem.id;

      // Appel de la fonction deleteData pour supprimer l'élément
      deleteData(idToDelete);
    });

    const nomElement = document.createElement("figcaption");
    nomElement.textContent = "édite";

    figure.appendChild(imageElement);
    figure.appendChild(nomElement);
    figure.appendChild(iconContainer);

    modalContent.appendChild(figure);
  }
}
/**
 *  Cette fonction asynchrone supprime les données d'un élément dans l'API.
 * @param {*} id L'identifiant de l'élément à supprimer.
 */
async function deleteData(id) {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Erreur de réponse du serveur");
    }

    document.getElementById("modal-figure_" + id).remove();
    document.getElementById("figure_" + id).remove();
  } catch (error) {
    console.error("Une erreur s'est produite", error);
    throw error;
  }
}

const ajoutBtn = document.querySelector(".ajout");

ajoutBtn.addEventListener("click", () => {
  const back = document.querySelector(".js-modal-back");
  const modGallery = document.getElementById("modal-gallery");
  const modAjout = document.getElementById("ajouts");
  modGallery.style.display = "none";
  modAjout.style.display = null;
  back.style.visibility = "visible";
});

const input = document.getElementById("file");
const preview = document.getElementById("preview");
/**
 * Cette fonction écoute les changements d'un élément input de type "file" et met à jour un élément img avec l'aperçu de l'image sélectionnée.
 */
input.addEventListener("change", function () {
  const file = input.files[0];
  const reader = new FileReader();

  reader.onload = function () {
    preview.src = reader.result;
    preview.style.display = "block";
  };

  reader.readAsDataURL(file);
});

const getMaxId = async () => {
  try {
    const data = await getData();
    let maxId = 0;
    data.forEach((item) => {
      if (item.id > maxId) {
        maxId = item.id;
      }
    });
    return maxId;
  } catch (error) {
    console.error("Une erreur s'est produite", error);
    throw error;
  }
};

//POST //

const myForm = document.querySelector("form");
const categorySelect = document.querySelector("#modal-cat");
const titleInput = document.querySelector('input[type="text"]');
const imgInput = document.querySelector('input[type="file"]');

/**
   * Cette fonction écoute la soumission du formulaire et envoie une requête POST contenant les données saisies dans le formulaire, y compris un fichier image, pour créer un nouvel élément de la galerie.
   
   */
myForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (verify()) {
    return;
  }

  const lastId = await getMaxId();
  const newId = lastId + 1;

  const token = localStorage.getItem("token");

  // Créer une instance de FormData pour stocker les données du formulaire, y compris le fichier image
  const formData = new FormData();
  formData.append("Id", newId);
  formData.append("title", titleInput.value);
  formData.append("category", categorySelect.value);
  formData.append("image", imgInput.files[0]); // Ajout du fichier à envoyer dans le formulaire

  for (const [key, value] of formData.entries()) {
    console.log(`Clé : ${key}, Valeur : ${value}`);
  }

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Une erreur est survenue: " + response.status);
      }
    })
    .then((data) => {
      console.log(data);
      closeModal();
      const sectionGallery = document.getElementById("gallery");
      displayFigure(data, sectionGallery);
      displayModalData([data]);
    })
    .catch((error) => {
      console.error("Erreur lors de l'envoi de la requête:", error);
    });
});

/**
 * cette fonction permet de verifier si les champ sont vide envoi un message d'erreur
 * @returns
 */
function verify() {
  const inputImg = document.getElementById("file");
  const inputTitre = document.getElementById("titre");
  const inputCat = document.getElementById("modal-cat");
  if (
    inputImg.value === "" ||
    inputTitre.value === "" ||
    inputCat.value === ""
  ) {
    document.getElementById("error").textContent = "Il faut remplir les champs";

    return false;
  }
}
