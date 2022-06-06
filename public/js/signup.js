//Retrieves HTML elements by Id
const form = document.getElementById("form-signup");
const nameEl = document.getElementById("name-input");
const emailEl = document.getElementById("email-input");
const passwordEl = document.getElementById("password-input");
const confirmPasswordEl = document.getElementById("confirm-password-input");

//Handler function that accepts user input upon signing up
const formHandler = async (event) => {
	event.preventDefault();

	let emptyField = false;

	// Collect values from the login form
	const nameVal = nameEl.value.trim();
	const emailVal = emailEl.value.trim();
	const passwordVal = passwordEl.value.trim();
	const confirmPasswordVal = confirmPasswordEl.value.trim();

	//Prevents a null entry from user
	if (!nameVal) {
		nameEl.style.borderColor = "lightcoral";
		emptyField = true;
	}

	//Prevents a null entry from user
	if (!emailVal) {
		emailEl.style.borderColor = "lightcoral";
		emptyField = true;
	}

	//Prevents a null entry from user
	if (!passwordVal) {
		passwordEl.style.borderColor = "lightcoral";
		emptyField = true;
	}

	//Prevents a null entry from user
	if (!confirmPasswordVal) {
		confirmPasswordEl.style.borderColor = "lightcoral";
		emptyField = true;
	}

	//Prevents a null entry from user
	if (passwordVal != confirmPasswordVal) {
		password.style.borderColor = "lightcoral";
		confirmPasswordEl.style.borderColor = "lightcoral";
		emptyField = true;
	}

	if (emptyField) return;

	//Fetches manager signup api page
	const signupData = await fetch("/api/manager/signup", {
		method: "POST",
		//Stringifies JSON input
		body: JSON.stringify({ name: nameVal, email: emailVal, password: passwordVal }),
		headers: { "Content-Type": "application/json" },
	});

	const signupObj = await signupData.json();
	if (!signupObj.pass) {
		alert(signupObj.message);
		return;
	}

	//Renders homepage
	window.location = "/";
};
form.addEventListener("submit", formHandler);
