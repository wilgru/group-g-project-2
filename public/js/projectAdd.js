const newFormHandler = async (event) => {
  event.preventDefault();

  const projectName = document.querySelector('#inputProjectName').value;
  const budget = document.querySelector('#inputBudget').value;
  const clientId = document.querySelector('#inputClient').value;
  const managerId = document.querySelector('#inputManager').value;
  const address = document.querySelector('#inputAddress').value;
  const city = document.querySelector('#inputCity').value;
  const state = document.querySelector('#inputState').value;
  const zip = document.querySelector('#inputZip').value;
  const notes = document.querySelector('#inputDescription').value;
  const date = new Date();

  console.log(projectName, budget, clientId, managerId, address, city, state, zip, notes);

  if (projectName && budget && clientId && managerId && address && city && state && zip && notes && date) {
    const response = await fetch('/api/project/', {
      method: 'POST',
      body: JSON.stringify({
        projectName, budget, clientId, managerId, address, city, state, zip, notes, dateCreated: date,
      }),

      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(projectName, budget, clientId, managerId, address, city, state, zip, notes);

    if (response.ok) {
      document.location.replace('/project/list');
    } else {
      alert('Failed to create project');
    }
  }
};

document.querySelector('.form-project-add').addEventListener('submit', newFormHandler);
