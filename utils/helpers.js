const capitalise = (word) => {

}

const format_date = (date) => {
    const newDate = new Date(date);
    return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
}

module.exports = { format_date, capitalise };