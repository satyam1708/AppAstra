require("dotenv").config(); // load env variables

const app = require("./src/app");

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`✅ Server started on http://localhost:${PORT}`);
});
