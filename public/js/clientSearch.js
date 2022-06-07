const searchButtonHandler = async (event) => {
  event.preventDefault();

  // get users search input
  const search = document.querySelector('#search-input').value;

  // redirect to list page, but with a query param conntaininng the search term. Page router will handle the search functionality 
  document.location.replace(`/client/list/?q=${search}`);
};

document.getElementById('search-client').addEventListener('submit', searchButtonHandler);
