const express = require("express");
const path = require("path");
const authRoutes = require("./app/routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Set up Pug as the view engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "app/views"));

// Routes
app.use("/", authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});