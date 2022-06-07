const _ = require('lodash');

// capitalise first letter of a given string
const capitalise = (word) => _.capitalize(word);

const capitalise_first_word = (word) => {
  const firstName = _.split(word, ' ')[0];
  return _.capitalize(firstName);
};

// pad a number with 2 leading zeros
const pad = (word) => _.padStart(word, 3, '0');

// format number to currency with comma seperated intervals
const format_dollars = (value) => {
  const formatter = Intl.NumberFormat('en-US', { style: 'currency', currency: 'AUD' });

  return formatter.format(value).replace('A$', '$');
};

// return length of given array
const get_length = (array) => array.length;

// return dates in a prettier format
const format_date = (date) => {
  const newDate = new Date(date);
  return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
};

// export modules
module.exports = {
  format_date, format_dollars, capitalise, capitalise_first_word, get_length, pad,
};
