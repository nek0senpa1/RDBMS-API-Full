const server = require('./api/server');

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Heyo Captain Jack, Running on Port a  Port ${port} Snack!`));
