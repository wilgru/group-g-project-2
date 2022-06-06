const delButtonHandler = async (event) => {
  // get id of current client
  const id = event.target.getAttribute('data-client-id');

  //delete client fetch request
  const response = await fetch(`/api/client/${id}`, {
    method: 'DELETE',
  });

  // if all goes well then redirect to client list, otherwise alert user
  if (response.ok) {
    document.location.replace('/client');
  } else {
    alert('Failed to delete client');
  }
};

document.querySelector('#delete-client').addEventListener('click', delButtonHandler);
