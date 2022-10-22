//

const qSelect = (select) => document.querySelector(select);
const form_blank = qSelect("#form");

const createAccount = () => {
  const form = qSelect("#form");

  const user = JSON.parse(localStorage.getItem(form.username.value));

  function verifyPassword(passwd, re_passwd) {
    return passwd === re_passwd;
  }

  if (user) {
    const inputs_user = document.getElementById("inputs_user");
    inputs_user.innerHTML += `
        <div class="alert alert-danger" role="alert">
        Usuário já cadastrado
        </div>
        `;
  } else {
    if (verifyPassword(form.password.value, form["password-repeat"].value)) {
      localStorage.setItem(
        form.username.value,
        JSON.stringify({
          username: form.username.value,
          password: form.password.value,
          messages: [],
        })
      );
    }
    const inputs_pssword = document.getElementById("inputs_password");
    inputs_pssword.innerHTML += `
        <div class="alert alert-success" role="alert">
        Conta Criada com sucesso! \n Volte e faça seu login!
        </div>
        `;
  }

  form.innerHTML = form_blank.innerHTML;
};
