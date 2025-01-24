const express = require('express');
const router = express.Router();
//importing prisma
const prisma = require("../prisma");

router.get('/', async (req, res) => {
  const users = await prisma.user.findMany();
  res.render('admin', { users });
});

module.exports = router;
