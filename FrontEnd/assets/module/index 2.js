const getData = async () => {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    if (!response.ok) {
      throw new Error("Erreur de réponse du serveur");
    }
    const data = await response.json();
    console.log(data);

    let categoryId = [];
    let categories = [];

    for (let elem of data) {
      displayData(elem);
      if (!categoryId.includes(elem.categoryId)) {
        categoryId.push(elem.categoryId);
        categories.push(elem.categories);
      }
    }
    displayCategory(categories);
  } catch (error) {
    console.error("Une erreur s'est produite", error);
    throw error;
  }
};
function displayData(data) {
  const sectionGallery = document.getElementById("gallery");

  for (let elem of data) {
    const figure = document.createElement("figure");
    figure.setAttribute("id", `fig_${data.id}`);
    figure.setAttribute("class", "fig");
    figure.setAttribute("data-cat", data.categoryId);
    const imageElement = document.createElement("img");
    imageElement.src = elem.imageUrl;
    const nomElement = document.createElement("figcaption");
    nomElement.textContent = elem.title;

    figure.appendChild(imageElement);
    figure.appendChild(nomElement);
    sectionGallery.appendChild(figure);
  }
}

displayCategs = (data) => {
  for (let elem of data) {
    let cat = document.createElement("option");
    document.querySelector("#categs").appendChild(cat);
    cat.value = elem.id;
    cat.textContent = elem.name;
  }
  const categs = document.getElementById("categs");
  const all = document.createElement("span");
  all.setAttribute("id", 0);
  all.setAttribute("class", "cat");
  all.textContent = "Tous";
  all.addEventListener("click", (e) => {
    sortByCat(e);
  });

  categs.appendChild(all);
  for (let elem of data) {
    const cat = document.createElement("span");
    cat.setAttribute("id", elem.id);
    cat.setAttribute("class", "cat");
    cat.textContent = elem.name;
    cat.addEventListener("click", (event) => {
      sortByCat(event);
    });
    categs.append(cat);
  }
};

sortByCat = (event) => {
  const all = document.getElementsByClassName("span");
  if (event.targer.id !== "0") {
    if (e.dataset.cat !== e.tTarget.target.id) {
      elem.classList.add("hid");
    } else {
      if (elem.classList.contains("hid")) Element.classList.remove("hid");
    }
  } else {
    if (elem.classList.contains("hid")) Element.classList.remove("hid");
  }
};
