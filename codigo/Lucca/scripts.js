const form = document.getElementById("form");
const nome = document.getElementById("nome");
const idade = document.getElementById("idade");
const cep = document.getElementById("cep");
const endereco = document.getElementById("endereco");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirmation = document.getElementById("password-confirmation");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputs();
});

function checkInputs() {
  const nomeValue = nome.value;
  const idadeValue = idade.value;
  const cepValue = cep.value;
  const enderecoValue = endereco.value;
  const usernameValue = username.value;
  const emailValue = email.value;
  const passwordValue = password.value;
  const passwordConfirmationValue = passwordConfirmation.value;

  if (nomeValue === "") {
    setErrorFor(nome, "O nome real é obrigatório.");
  } else {
    setSuccessFor(nome);
  }

  if (idadeValue === "") {
    setErrorFor(idade, "A idade é obrigatória.");
  } else {
    setSuccessFor(idade);
  }

  if (cepValue === "") {
    setErrorFor(cep, "O nome CEP é obrigatório.");
  } else {
    setSuccessFor(cep);
  }

  if (enderecoValue === "") {
    setErrorFor(endereco, "O nome endereço é obrigatório.");
  } else {
    setSuccessFor(endereco);
  }

  if (usernameValue === "") {
    setErrorFor(username, "O nome de usuário é obrigatório.");
  } else {
    setSuccessFor(username);
  }

  if (emailValue === "") {
    setErrorFor(email, "O email é obrigatório.");
  } else if (!checkEmail(emailValue)) {
    setErrorFor(email, "Por favor, insira um email válido.");
  } else {
    setSuccessFor(email);
  }

  if (passwordValue === "") {
    setErrorFor(password, "A senha é obrigatória.");
  } else if (passwordValue.length < 7) {
    setErrorFor(password, "A senha precisa ter no mínimo 7 caracteres.");
  } else {
    setSuccessFor(password);
  }

  if (passwordConfirmationValue === "") {
    setErrorFor(passwordConfirmation, "A confirmação de senha é obrigatória.");
  } else if (passwordConfirmationValue !== passwordValue) {
    setErrorFor(passwordConfirmation, "As senhas não conferem.");
  } else {
    setSuccessFor(passwordConfirmation);
  }

  const formControls = form.querySelectorAll(".form-control");

  const formIsValid = [...formControls].every((formControl) => {
    return formControl.className === "form-control success";
  });

  if (formIsValid) {
    console.log("O formulário está 100% válido!");
    location.href = 'confirm/confirm.html'
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  // Adiciona a mensagem de erro
  small.innerText = message;

  // Adiciona a classe de erro
  formControl.className = "form-control error";
}

function setSuccessFor(input) {
  const formControl = input.parentElement;

  // Adicionar a classe de sucesso
  formControl.className = "form-control success";
}

function checkEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}
