const newFormHandler = async (event) => {
  event.preventDefault();

  // get all of users inputs
  const firstName = document.querySelector('#inputFirstName').value;
  const lastName = document.querySelector('#inputLastName').value;
  const phone = document.querySelector('#inputPhone').value;
  const email = document.querySelector('#inputEmail').value;
  const address = document.querySelector('#inputAddress').value;
  const city = document.querySelector('#inputCity').value;
  const state = document.querySelector('#inputState').value;
  const zip = document.querySelector('#inputZip').value;
  const dateCreated = new Date();

  // make sure no field is left empty
  if (firstName && lastName && phone && email && address && city && state && zip && dateCreated) {
    const response = await fetch('/api/client/', {
      method: 'POST',
      body: JSON.stringify({
        firstName, lastName, phone, email, address, city, state, zip, dateCreated,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // if all goes well then redirect to client list, otherwise alert user
    if (response.ok) {
      document.location.replace('/client/list');
    } else {
      alert('Failed to create a client');
    }
  }
};

document.querySelector('.new-client-form').addEventListener('submit', newFormHandler);
