//

const session = localStorage.getItem("session");
let logged = sessionStorage.getItem("logged");
const qSelect = (select) => document.querySelector(select);

checkLogged();

const login = () => {
  const form = qSelect("#form");

  const user = JSON.parse(localStorage.getItem(form.username.value));
  if (!user) {
    alert("Login ou senha inválidos");
    return;
  }
  if (!(form.password.value === user.password)) {
    alert("Login ou senha inválidos");
    return;
  }
  saveSession(form.username.value);
  window.location = "/home.html";
};

function saveSession(data) {
  sessionStorage.setItem("logged", data);
}

function checkLogged() {
  if (session) {
    sessionStorage.setItem("logged", session);
    logged = session;
  }

  if (logged) {
    saveSession(logged, session);
    window.location.href = "/home.html";
  }
}
