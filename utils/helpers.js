module.exports = {
  toUpperCase: (string) => string.toUpperCase(),
  eq: (a, b, options) => {
    console.log(options); //Debugging
    return a === b ? options.fn(this) : options.inverse(this);
  },
};