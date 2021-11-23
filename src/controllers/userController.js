import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

async function getList(req, res) {
    let users = [];
    users = await prisma.gd_user.findMany();
    console.log(users)
    return user;
}

module.exports = { getList }
