const newFormHandler = async (event) => {
  event.preventDefault();

  // get all of users inputs
  const firstName = document.querySelector('#input-first-name').value;
  const lastName = document.querySelector('#input-last-name').value;
  const phone = document.querySelector('#input-phone').value;
  const email = document.querySelector('#input-email').value;
  const address = document.querySelector('#input-address').value;
  const city = document.querySelector('#input-city').value;
  const state = document.querySelector('#input-state').value;
  const zip = document.querySelector('#input-zip').value;
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
