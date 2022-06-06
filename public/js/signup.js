const form = document.getElementById('form-signup');

const nameEl = document.getElementById('name-input');
const emailEl = document.getElementById('email-input');
const passwordEl = document.getElementById('password-input');
const confirmPasswordEl = document.getElementById('confirm-password-input');

const formHandler = async (event) => {
  event.preventDefault();

  let emptyField = false;

  // Collect values from the login form
  const nameVal = nameEl.value.trim();
  const emailVal = emailEl.value.trim();
  const passwordVal = passwordEl.value.trim();
  const confirmPasswordVal = confirmPasswordEl.value.trim();

  if (!nameVal) {
    nameEl.style.borderColor = 'lightcoral';
    emptyField = true;
  }

  if (!emailVal) {
    emailEl.style.borderColor = 'lightcoral';
    emptyField = true;
  }

  if (!passwordVal) {
    passwordEl.style.borderColor = 'lightcoral';
    emptyField = true;
  }

  if (!confirmPasswordVal) {
    confirmPasswordEl.style.borderColor = 'lightcoral';
    emptyField = true;
  }

  if (passwordVal != confirmPasswordVal) {
    password.style.borderColor = 'lightcoral';
    confirmPasswordEl.style.borderColor = 'lightcoral';
    emptyField = true;
  }

  if (emptyField) return;

  const signupData = await fetch('/api/manager/signup', {
    method: 'POST',
    body: JSON.stringify({ name: nameVal, email: emailVal, password: passwordVal }),
    headers: { 'Content-Type': 'application/json' },
  });

  const signupObj = await signupData.json();
  if (!signupObj.pass) {
    alert(signupObj.message);
    return;
  }

  // window.location.replace("/");
  window.location = '/';
};
form.addEventListener('submit', formHandler);
