class HomeController {
  getHomePage(req, res) {
    res.render('home', { 
      title: 'Home',
      username: 'User'
    });
  }
}

module.exports = new HomeController();