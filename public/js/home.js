const dateTime = document.getElementById('time')

const getTime = () => {
    const newTime = new Date()
    dateTime.textContent = `${newTime.getDate()}/${newTime.getMonth() + 1}/${newTime.getFullYear()} ${newTime.getHours()}:${newTime.getMinutes()}`
}

getTime()
const timeOut = setInterval(getTime, 2000);