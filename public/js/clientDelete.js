const delButtonHandler = async (event) => {
  //prompt user for confirmation
  const confirmation = confirm("Are you sure you want to delete this client? This action cannot be undone.")
  if (!confirmation) return;

  // get id of current client
  const id = event.target.getAttribute('data-client-id');

  //delete client fetch request
  const response = await fetch(`/api/client/${id}`, {
    method: 'DELETE',
  });



  // if all goes well then redirect to client list, otherwise alert user
  if (response.ok) {
    document.location.replace('/client/list');
  } else {
    alert('Failed to delete client');
  }
};

document.querySelector('#delete-client').addEventListener('click', delButtonHandler);
