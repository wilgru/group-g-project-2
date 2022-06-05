const delFormHandler = async (event) => {
	event.preventDefault();

	const name = document.querySelector("#inputclientName").value();
	const budget = document.querySelector("#inputBudget").value();
	const client = document.querySelector("#inputClient").value();
	const address = document.querySelector("#inputAddress").value();
	const city = document.querySelector("#inputCity").value();
	const state = document.querySelector("#inputState").value();
	const zip = document.querySelector("#inputZip").value();
	const description = document.querySelector("#inputDescription").value();

	if (name && budget && client && address && city && state && zip && description) {
		const response = await fetch(`/api/clientRoutes${id}`, {
			method: "DELETE",
		});

		if (response.ok) {
			document.location.replace("/client");
		} else {
			alert("Failed to delete a client");
		}
	}
};

document.querySelector(".form-client-delete").addEventListener("click", delFormHandler);
