const User = require('../models/User');

class TeamController {
    async list(req, res) {
        const users = await User.findAll();
        res.render('team/list', { users });
    }
}

module.exports = new TeamController();
