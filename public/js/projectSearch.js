const searchButtonHandler = async (event) => {
  event.preventDefault();

  const search = document.querySelector('#search-input').value;

  document.location.replace(`/project/list/?q=${search}`);
};

document.getElementById('search-project').addEventListener('submit', searchButtonHandler);
