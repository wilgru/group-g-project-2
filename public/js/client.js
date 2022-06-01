const searchButtonHandler = async (event) => {
	event.preventDefault();

	const search = document.querySelector("#search-button");
	console.log("message");
	const searchField = document.getElementById("#search-button-field").value();
	console.log(searchField);

	if (searchField) {
		const response = await fetch(`/client/list/?=${firstName}`, {
			method: "POST",
			// body: JSON.stringify({ project_id, comment }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.ok) {
			document.location.reload();
		} else {
			alert("Failed to fetch client");
		}
	}
};

document.querySelector("#search-button").addEventListener("click", searchButtonHandler);
