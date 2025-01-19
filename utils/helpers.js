module.exports = {
  toUpperCase: (string) => string.toUpperCase(),
  eq: (a, b, options) => {
    return a === b ? options.fn(this) : options.inverse(this);
  },
};