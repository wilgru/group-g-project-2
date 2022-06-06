//Retrieves HTML elements by Id
const loginForm = document.getElementById("form-login");
const emailEl = document.getElementById("email-input");
const passwordEl = document.getElementById("password-input");

//Handler function that takes user to homepage upon logging in
const loginHandler = async (event) => {
	event.preventDefault();

	//Prevents a null entry from user
	let emptyField = false;
	//Variables for email and password inputs
	const email = emailEl.value;
	const password = passwordEl.value;

	//Prevents a null entry from user
	if (!email) {
		emailEl.style.borderColor = "lightcoral";
		emptyField = true;
	}

	//Prevents a null entry from user
	if (!password) {
		passwordEl.style.borderColor = "lightcoral";
		emptyField = true;
	}

	if (emptyField) return;

	//Fetches manager api to validate user login
	const loginData = await fetch("./api/manager/login", {
		method: "POST",
		//Stringifies JSON input
		body: JSON.stringify({ email, password }),
		headers: { "Content-Type": "application/json" },
	});

	loginObj = await loginData.json();
	if (!loginObj.pass) {
		alert(loginObj.message);
		return;
	}

	//Takes user to homepage
	window.location = "/";
};

loginForm.addEventListener("submit", loginHandler);
