const _ = require('lodash');

const capitalise = (word) => _.capitalize(word);

const capitalise_first_word = (word) => {
  const firstName = _.split(word, ' ')[0];
  return _.capitalize(firstName);
};

const pad = (word) => _.padStart(word, 3, '0');

const format_dollars = (value) => {
  const formatter = Intl.NumberFormat('en-US', { style: 'currency', currency: 'AUD' });

  return formatter.format(value).replace('A$', '$');
};

const get_length = (array) => array.length;

const format_date = (date) => {
  const newDate = new Date(date);
  return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
};

module.exports = {
  format_date, format_dollars, capitalise, capitalise_first_word, get_length, pad,
};
