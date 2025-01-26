const express = require('express');
const router = express.Router();

const isAuthenticated = require('../middlewares/isAuthenticated');
const isAdmin = require('../middlewares/isAdmin');
const { user } = require('../prisma');

router.use('/auth', require('./auth'));
router.use('/admin', isAdmin, require('./admin'));

router.get('/profile', (req, res) => {
  const { email } = req.user;
  const { name } = req.user;
  const { phone } = req.user;
  const { course } = req.user;

  res.render('profile', { email, name, phone, course });
})

router.get('/usercourses', async (req, res) => {
  try {
    const userEmail = req.user.email; // Assuming req.user contains the authenticated user's information
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      include: { courses: true },
    });

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.render('usercourses', { courses: user.courses });
  } catch (error) {
    console.error('Error fetching user courses:', error);
    res.status(500).send('Internal Server Error');
  }
});

//test the middleware
router.get('/*', isAuthenticated, function (req, res) {
  console.log(req.session)
  res.render('index', { title: 'Unlock Your Future with French Voyage Akademie', user: req.user });
});


module.exports = router;
