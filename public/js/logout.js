const logoutButton = document.getElementById("logout");

//Function to log out user on click
const logout = async () => {
	//fetches manager api
	const response = await fetch("/api/manager/logout", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
	});

	//Takes user to login page again
	if (response.ok) {
		document.location.replace("/login");
	} else {
		alert(response.statusText);
	}
};

logoutButton.addEventListener("click", logout);
