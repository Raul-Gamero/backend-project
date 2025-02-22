const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.render('admin', { users });
  } catch (error) {
    console.error('Error fetching users:', error);
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
    console.log('Creating user with data:', { name, email, password, phone, course }); // Log input data

    // Check if a user with the same email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).send('A user with this email already exists.');
    }

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