// Get all the "delete buttons" in the HTML
const projectLinksDiv = document.querySelector("list-group");

//Function to delete a project by Id
function projectDelete(projectID) {
	//prompt user for confirmation
	const confirmation = confirm("Are you sure you want to delete this project? This action cannot be undone.")
	if (!confirmation) return;

	const thisProjectID = projectID;

	fetch(`/project/delete/${thisProjectID}`, {
		method: "DELETE",
	}).then((response) => {
		if (response.ok) {
			//Renders project list with project removed
			document.location.replace("/project/list");
		} else {
			alert(response.statusText);
		}
	});
}

//Event listener to remove project on click
document.querySelectorAll(".delete-p-class").forEach((item) => {
	item.addEventListener("click", (event) => {
		const projectID = event.target.dataset.projectid;
		projectDelete(projectID);
	});
});
