const newFormHandler = async (event) => {
	event.preventDefault();

	const name = document.querySelector("#inputProjectName").value();
	const budget = document.querySelector("#inputBudget").value();
	const client = document.querySelector("#inputClient").value();
	const manager = document.querySelector("#inputManager").value();
	const address = document.querySelector("#inputAddress").value();
	const city = document.querySelector("#inputCity").value();
	const state = document.querySelector("#inputState").value();
	const zip = document.querySelector("#inputZip").value();
	const description = document.querySelector("#inputDescription").value();

	if (name && budget && client && manager && address && city && state && zip && description) {
		const response = await fetch(`/api/projectRoutes`, {
			method: "POST",
			body: JSON.stringify({ name, budget, client, manager, address, city, state, zip, description }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.ok) {
			document.location.replace("/projects");
		} else {
			alert("Failed to create project");
		}
	}
};

document.querySelector(".form-project-add").addEventListener("submit", newFormHandler);
