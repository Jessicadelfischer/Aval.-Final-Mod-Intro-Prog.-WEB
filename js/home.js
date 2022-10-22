//

const session = localStorage.getItem("session");
let logged = sessionStorage.getItem("logged");
let user = undefined;
let isEdit = false;
let IdEdit = undefined;

function checkLogged() {
  if (session) {
    sessionStorage.setItem("logged", session);
    logged = session;
  }

  if (!logged) {
    window.location.href = "/index.html";
    return;
  }

  const dataUser = localStorage.getItem(logged);
  if (dataUser) {
    user = JSON.parse(dataUser);
  }
}

function printMessages() {
  let messagesHTML = "";
  const messages = user.messages;
  if (messages.length) {
    messages.forEach((message, index) => {
      messagesHTML += `
        <tr class="line">
          <td class="table-id">${index}</td>
          <td class="table-description">${message.description}</td>
          <td class="table-details">${message.details}</td>
          <td class="table-buttons text-center"><button type="button" class="btn btn-success text-black-50 " onClick="editMessage(${index})">Editar</button>
            <button type="button" class="btn btn-danger text-black-50 btn-delete" onClick="clickModal(${index})">Apagar</button>
          </td>
        </tr>
      `;
    });
  }
  document.getElementById("table-body").innerHTML = messagesHTML;
}

function clickModal(index) {
  let modal = new bootstrap.Modal(document.getElementById("Apagar"));
  const btnApagar = document.getElementById("btn-apagar");
  btnApagar.setAttribute("onclick", `deleteMessage(${index})`);
  modal.show();
}

function saveMessage() {
  const formMessage = document.getElementById("form-message");
  const message = {
    description: formMessage.message.value,
    details: formMessage.details.value,
  };
  if (isEdit) {
    user.messages[IdEdit] = message;
    isEdit = false;
    IdEdit = null;
  } else {
    user.messages.push(message);
  }
  localStorage.setItem(user.username, JSON.stringify(user));
  printMessages();
  formMessage.reset();
}

function deleteMessage(index) {
  user.messages.splice(index, 1);
  localStorage.setItem(user.username, JSON.stringify(user));
  printMessages();
}

function editMessage(index) {
  const formMessage = document.getElementById("form-message");
  formMessage.message.value = user.messages[index].description;
  formMessage.details.value = user.messages[index].details;
  isEdit = true;
  IdEdit = index;
}

checkLogged();
printMessages();

const btnBack = document.getElementById("logoff");
console.log(btnBack);
btnBack.addEventListener("click", function (e) {
  e.preventDefault();
  sessionStorage.removeItem("logged");
  localStorage.removeItem("session");
  window.location.href = "/index.html";
});
