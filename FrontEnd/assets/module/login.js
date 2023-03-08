const form = document.querySelector("#login1");
const submitBtn = document.querySelector("#submit");

submitBtn.addEventListener("click", async (event) => {
  event.preventDefault();

  const inputEmail = document.querySelector("#email1").value;
  const inputPass = document.querySelector("#password").value;

  const user = {
    email: inputEmail,
    password: inputPass,
  };

  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Adresse e-mail ou mot de passe invalide");
    }

    const data = await response.json();
    const id = data.userId;
    const token = data.token;
    localStorage.setItem("userId", id);
    localStorage.setItem("token", token);

    console.log(token, id);
    window.location.href = "http://127.0.0.1:5500/FrontEnd/index.html";
  } catch (error) {
    console.error(error);
  }
  console.log(user);
});
