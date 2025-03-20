const UserModel = require("../models/UserModel");

class AuthController {
  // Render the login page
  getLoginPage(req, res) {
    res.render("signin", { title: "Sign In" });
  }

  // Handle user login
  async loginUser(req, res) {
    const { username, password } = req.body;
console.log(username)
    try {
      // Find the user in the database
      const user = await UserModel.findUserByUsernameOrEmail(username, username);
// console.log(user)
      if (!user) {
        return res.render("signin", { title: "Sign In", error: "User not found" });
      }

      // Compare the password
      const isPasswordValid = await UserModel.comparePasswords(password, user.password);

      if (!isPasswordValid) {
        return res.render("signin", { title: "Sign In", error: "Invalid password" });
      }

      // Redirect to the home page after successful login
      res.redirect("/");
    } catch (err) {
      res.render("signin", { title: "Sign In", error: "An error occurred" });
    }
  }

  // Render the sign-up page
  getSignUpPage(req, res) {
    res.render("signup", { title: "Sign Up" });
  }

  // Handle user sign-up
  async signUpUser(req, res) {
    const { username, email, password } = req.body;
    console.log("sfsdfdsfd")
    try {
      // Create the user in the database
      console.log("-----------dsdsds")
      await UserModel.createUser(username, email, password);
console.log("-----------")
      // Redirect to the login page after successful sign-up
      res.redirect("/signin");
    } catch (err) {
      res.render("signup", { title: "Sign Up", error: "An error occurred" });
    }
  }
}

module.exports = new AuthController();