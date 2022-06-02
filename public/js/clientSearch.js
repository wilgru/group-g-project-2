const searchButtonHandler = async (event) => {
	event.preventDefault();

	const search = document.querySelector("#search-input").value;

	document.location.replace(`/client/list/?q=${search}`);
};

document.getElementById("search-client").addEventListener("submit", searchButtonHandler);
