import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export default handler;

async function handler(req, res) {
    const email = req.query.email;
    try {
        const result = await prisma.usuario.findUnique({
            where: {
                email: email,
            },
        });
        return res.status(200).json(result);
    }catch (e) {
        console.log(e);
        return res.status(400).json(e);
    }
}
