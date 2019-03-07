const { tokenize } = require('./tokenizer.js');

module.exports.parse = expr => {
  const tokens = tokenize(expr);

  console.log(tokens);
};
