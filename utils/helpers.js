const _ = require('lodash')

const capitalise = (word) => {
    return _.capitalize(word)
}

const capitalise_first_word = (word) => {
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

module.exports = { format_date, capitalise, capitalise_first_word, get_length, pad };