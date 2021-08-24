import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export default handler;

function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return getUsers();
        case 'POST':
            return createUser();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function getUsers() {
        const usuarios = await prisma.usuario.findMany();
        console.log(usuarios);
        return res.status(200).json(usuarios);
    }

    async function createUser() {
        try {
            const resp = await prisma.usuario.create({
                data:{
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha,
                    adm: req.body.adm
                }
            });
            return res.status(200).json(resp);
        }catch (e) {
            return res.status(400).json(e);
        }
    }
}
