const { setupServer } = require("./server.js");
const app = setupServer();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
