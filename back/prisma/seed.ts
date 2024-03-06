import { PrismaClient } from '@prisma/client'
import { hashSync } from "bcrypt";

const prisma = new PrismaClient();
async function main() {
    const user1 = await prisma.user.upsert({
        where: { email: 'test@test.com' },
        update: {},
        create: {
            email: 'test@test.com',
            password: hashSync('test', 12),
        },
    })
    const user2 = await prisma.user.upsert({
        where: { email: 'admin@mmi.fr' },
        update: {},
        create: {
            email: 'admin@mmi.fr',
            password: hashSync('test', 12),
        },
    })
    console.log({ user1, user2 })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
