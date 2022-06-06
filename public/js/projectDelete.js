// Get all the "delete buttons" in the HTML
const projectLinksDiv = document.querySelector("list-group");

function projectDelete(projectID) {
    let thisProjectID = projectID;
    console.log(thisProjectID)
    fetch(`/project/delete/${thisProjectID}`, {
        method: 'DELETE',
    }).then((response) => {
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to delete project');
        }
    })
}

document.querySelectorAll('.delete-p-class').forEach(item => {
    item.addEventListener('click', event => {
        let projectID = event.target.dataset.projectid;
        projectDelete(projectID)
    })
})

// projectLinksDiv.addEventListener("click", projectDelete)
// function deleteProject() {
//     fetch('/', {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' },
//     });

//     if (response.ok) {
//         document.location.replace('/login');
//     } else {
//         alert(response.statusText);
//     }

// }
