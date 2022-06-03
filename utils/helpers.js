const _ = require('lodash')

const capitalise = (word) => {
    const firstName = _.split(word, ' ')[0]
    return _.capitalize(firstName)
}
const pad = (word) => {
    return _.padStart(word, 3, '0')
}

const get_length = (array) => {
    return array.length
}

const format_date = (date) => {
    const newDate = new Date(date);
    return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
}

module.exports = { format_date, capitalise, get_length, pad };