const express = require('express');

const app = express();

app.get('*', (req, res) => {
  res.send({ test: 'ok' });
});

// //////

const PORT = process.env.PORT || 3090;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listen on port: ${PORT}`);
});
