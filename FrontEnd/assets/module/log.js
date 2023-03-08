console.log("bjr");

function la() {
  const intro = document.getElementById("introduction");
  const port = document.getElementById("portfolio");
  const img = intro.querySelector("figure");
  const art = intro.querySelector("article");
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  const p3 = document.createElement("p");
  console.log(port);
  p1.textContent = "modifier";
  p2.textContent = "modifier";
  p3.textContent = "modifier";
  img.appendChild(p1);
  port.appendChild(p2);
  art.appendChild(p3);
}
la();
