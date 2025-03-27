class HomeController {
  getHomePage(req, res) {
    res.render('home', { 
      title: 'Welcome',
      username: 'User'
    });
  }
}

module.exports = new HomeController(); 