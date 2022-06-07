const newFormHandler = async (event) => {
	event.preventDefault();

	//Variables of a project defined by their correspinding Id values
	const projectName = document.querySelector("#input-project-name").value;
	const budget = document.querySelector("#input-budget").value;
	const clientId = document.querySelector("#input-client").value;
	const managerId = document.querySelector("#input-manager").value;
	const address = document.querySelector("#input-address").value;
	const city = document.querySelector("#input-city").value;
	const state = document.querySelector("#input-state").value;
	const zip = document.querySelector("#input-zip").value;
	const notes = document.querySelector("#input-description").value;
	const date = new Date();

	//If statement lists out variables as the condition to be run by
	if (projectName && budget && clientId && managerId && address && city && state && zip && notes && date) {
		//fetches project api
		const response = await fetch("/api/project/", {
			method: "POST",
			//Stringifies JSON input
			body: JSON.stringify({
				projectName,
				budget,
				clientId,
				managerId,
				address,
				city,
				state,
				zip,
				notes,
				dateCreated: date,
			}),

			headers: {
				"Content-Type": "application/json",
			},
		});

		//Renders project list with new addition
		if (response.ok) {
			document.location.replace("/project/list");
		} else {
			alert("Failed to create project");
		}
	}
};

document.querySelector(".form-project-add").addEventListener("submit", newFormHandler);
