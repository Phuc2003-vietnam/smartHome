function isDateValid(dateStr) {
  return !isNaN(new Date(dateStr));
}

// DD/MM/YYYY
console.log(isDateValid("15/05/2019")); // false
