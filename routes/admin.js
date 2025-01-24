const express = require('express');
const router = express.Router();
//importing prisma
const prisma = require("../prisma");

router.get('/', async (req, res) => {
  const users = await prisma.user.findMany();
  res.render('admin', { users });
});

// Delete user
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

module.exports = router;
