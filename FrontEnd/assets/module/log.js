/*function la() {
  const intro = document.getElementById("introduction");
  const port = document.getElementById("portfolio");
  const img = intro.querySelector("figure");
  const art = intro.querySelector("article");
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  const p3 = document.createElement("p");
  const firstChild = art.firstChild;
  const h2 = port.querySelector("h2");

  const icon = document.createElement("img");
  icon.classList.add("edit");
  icon.src = "./assets/icons/ecrire .png";
  p1.appendChild(icon);
  p1.insertAdjacentText("beforeend", " modifier");
  p1.classList.add("modif");

  p2.appendChild(icon.cloneNode(true));
  p2.insertAdjacentText("beforeend", " modifier");

  const newDiv = document.createElement("div");
  newDiv.classList.add("modif");
  newDiv.appendChild(h2);
  newDiv.appendChild(p2);

  port.insertAdjacentElement("afterbegin", newDiv);

  p3.appendChild(icon.cloneNode(true));
  p3.insertAdjacentText("beforeend", " modifier");
  p3.classList.add("modif2");
  art.insertAdjacentElement("afterbegin", p3);
  console.log(p3);
  img.appendChild(p1);
}

la();*/
