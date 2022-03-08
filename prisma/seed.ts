import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()
// command to run seed: 
// npx prisma db seed --preview-feature
async function main() {
    await prisma.user.create({data: {firstName: 'jean',
    lastName: 'jacques'}})
}

main().catch(err => {
    console.log(err)
    process.exit(1)
}).finally(() => {prisma.$disconnect()})