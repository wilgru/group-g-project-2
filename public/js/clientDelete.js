const delButtonHandler = async (event) => {
	console.log(event);
	const id = event.target.getAttribute("data-client-id");

	const response = await fetch(`/api/client/${id}`, {
		method: "DELETE",
	});

	if (response.ok) {
		document.location.replace("/client");
	} else {
		alert("Failed to delete client");
	}
};

document.querySelector("#delete-client").addEventListener("click", delButtonHandler);
