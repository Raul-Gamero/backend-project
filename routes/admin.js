const express = require('express');
const router = express.Router();
//importing prisma
const prisma = require("../prisma");

router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.render('admin', { users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/admincourses', async (req, res) => {
  try {
    const courses = await prisma.course.findMany();
    res.render('admincourses', { courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/admincourses/create', async (req, res) => {
  try {
    const { title, description } = req.body;
    await prisma.course.create({
      data: { title, description },
    });
    res.redirect('/admincourses');
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).send('Internal Server Error');
  }
});


router.post('/delete/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    await prisma.user.delete({
      where: { id: userId },
    });
    res.redirect('/admin');
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Internal Server Error');
  }
});
router.post('/update/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, phone, course } = req.body;
    await prisma.user.update({
      where: { id: userId },
      data: { name, email, phone, course },
    });
    res.redirect('/admin');
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Internal Server Error');
  }
});
router.post('/create', async (req, res) => {
  try {
    const { name, email, password, phone, course } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { name, email, password: hashedPassword, phone, course },
    });
    res.redirect('/admin');
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Internal Server Error');
  }
});



module.exports = router;
