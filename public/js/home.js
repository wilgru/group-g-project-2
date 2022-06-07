const dateTime = document.getElementById("time");

//Function to retrieve time user has logged in to home screen
const getTime = () => {
	const newTime = new Date();
	dateTime.textContent = `${newTime.getDate()}/${newTime.getMonth() + 1}/${newTime.getFullYear()} ${String(newTime.getHours()).padStart(2, "0")}:${String(newTime.getMinutes()).padStart(2, "0")}`;
};

getTime();
const timeOut = setInterval(getTime, 2000);
