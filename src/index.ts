import { PrismaClient } from '@prisma/client';
import express from 'express';
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient()
const app = express();
app.use(express.json())

app.post('/login', async (req, res, next) => {
  let email = req.body.email ?? '';
  let password = req.body.password ?? '';
  
  const salt = await bcrypt.genSalt(10);
  let hash = await bcrypt.hash(password, salt);
  
  const users = await prisma.gd_user.findMany({
    where: {
      user_email: email
    }
  })
  if(users.length > 0){
    let user = users[0];
    console.log(hash);
    // console.log(await bcrypt.compare(password, users[0].user_password))

    if (await bcrypt.compare(password, users[0].user_password)) {
      var token = await jwt.sign(users[0], 'GenD');
      console.log(req.body)
      console.log(token)
      const d = new Date();
      let start = d.getTime();
      let end = start + (3600 * 6 );
      const result = await prisma.gd_token.create({
        data: {
          access_token: token,
          user_id: user.user_id,
          referesh_token: null,
          token_create_at: start.toString(),
          token_expired_at: end.toString()
         },
      })
      res.json({
        success: true,
        payload: result,
        message: "Login Successful",
      })
    }
  }
  

  //console.log(req.body)
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

app.post(`/users`, async (req, res) => {
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