const loginForm = document.getElementById('form-login');
const emailEl = document.getElementById('email-input');
const passwordEl = document.getElementById('password-input');

const loginHandler = async (event) => {
  event.preventDefault();

  let emptyField = false;
  const email = emailEl.value;
  const password = passwordEl.value;

  if (!email) {
    emailEl.style.borderColor = 'lightcoral';
    emptyField = true;
  }

  if (!password) {
    passwordEl.style.borderColor = 'lightcoral';
    emptyField = true;
  }

  if (emptyField) return;

  const loginData = await fetch('./api/manager/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  loginObj = await loginData.json();
  if (!loginObj.pass) {
    alert(loginObj.message);
    return;
  }

  window.location = '/';
};

loginForm.addEventListener('submit', loginHandler);
