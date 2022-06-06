//Function to submit search queries
const searchButtonHandler = async (event) => {
	event.preventDefault();

	//Selects search-input Id from HTML elements
	const search = document.querySelector("#search-input").value;

	//Renders new result
	document.location.replace(`/project/list/?q=${search}`);
};

document.getElementById("search-project").addEventListener("submit", searchButtonHandler);
