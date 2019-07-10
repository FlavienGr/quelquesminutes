const app = require('../app');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  const displayMessage = `
  ############################
  #   Quelquesmintutes started    #
  ############################
  # Port: ${PORT}
  ############################
  `;
  console.log(displayMessage);
});
