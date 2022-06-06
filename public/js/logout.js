const logoutButton = document.getElementById('logout');

const logout = async () => {
  const response = await fetch('/api/manager/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/login');
  } else {
    alert(response.statusText);
  }
};

logoutButton.addEventListener('click', logout);
