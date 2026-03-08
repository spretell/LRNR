const app = require("./index"); // importing configuration from Express app

// start server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
