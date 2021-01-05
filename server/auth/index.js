const router = require('express').Router();
const User = require('../db/models/User.js');

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) res.status(401).send('Wrong email/password combination');
    else if (!user.correctPassword(req.body.password)) {
      res.status(401).send('Wrong email/password combination');
    } else {
      req.login(user, (err) => {
        if (err) next(err);
        else res.status(200).send(user);
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    req.login(user, (err) => {
      if (err) next(err);
      else res.status(200).json(user);
    });
  } catch (error) {
    next(error);
  }
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  req.sendStatus(204);
  req.redirect('/');
});

router.get('/me', (req, res) => {
  res.json(req.user);
});

module.exports = router;
