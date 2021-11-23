import { PrismaClient } from '@prisma/client';
import express from 'express';
const bcrypt = require('bcrypt');

const prisma = new PrismaClient()
const app = express();
app.use(express.json())

app.post('/login', async (req, res) => {
  let { email } = req.body;
  let { password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  
  console.log(hash);

  const users = await prisma.gd_user.findMany({
    where: {
      user_email: email
    }
  })
  console.log(users[0].user_password);
  let respone = bcrypt.compareSync(users[0].user_password, hash)

  console.log(respone);
  console.log(req.body)
  res.json({
    success: true,
    payload: users,
    message: "Operation Successful",
  })
})

app.get('/users', async (req, res) => {
  const users = await prisma.gd_user.findMany()
  res.json({
    success: true,
    payload: users,
    message: "Operation Successful",
  })
})


app.get(`/users/:email`, async (req, res) => {
  const { email } = req.params
  const user = await prisma.gd_user.findMany({
    where: { user_email: email }
  })
  console.log(user)
  res.json({
    success: true,
    payload: user,
  })
})

app.post(`/users/`, async (req, res) => {
  console.log(req.body)
  const result = await prisma.gd_user.create({
    data: { ...req.body },
  })
  res.json({
    success: true,
    payload: result,
  })
})

app.delete(`/users/:email`, async (req, res) => {
  const { email } = req.params
  const users = await prisma.gd_user.delete({
    where: { user_email: email },
  })
  res.json({
    success: true,
    payload: users,
  })
})

app.put('/users/release/:id', async (req, res) => {
  const { id } = req.params
  const song = await prisma.gd_user.update({
    where: { user_id: Number(id) },
    data: { ...req.body },
  })
  res.json({
    success: true,
    payload: id,
  })
})


// #6
app.listen(3000, () =>
  console.log('REST API server ready at: http://localhost:3000'),
)

module.exports = app;