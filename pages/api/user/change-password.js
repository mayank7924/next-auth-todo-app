import {getSession} from 'next-auth/client'
import { connectToDb, query, closeConnection } from "../../../lib/db";
import { hash } from '../../../lib/hash';

const handler = async (req, res) => {
    if(req.method !== 'PATCH') {
        return;
    }
    const session = await getSession({ req: req })

    if(!session) {
        res.status(401).json({message: "Not authorized"})
        return;
    }

    const userMobile = session.user.name;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const client = await connectToDb();

    const get = `SELECT * FROM users where mobile_number='${userMobile}';`;
    const [user] = await query(client, get);
    if(!user) {
        await closeConnection(client);
        res.status(404).json({
            message: "user not found"
        })
        return;
    }
    if(!user.password==hash(oldPassword)) {
        await closeConnection(client);
        res.status(403).json({
            message: "older password did not match"
        })
        return;
    }
    const update = `UPDATE users SET password='${hash(newPassword)}' where id='${user.id}';`;
    await query(client, update);
    await closeConnection(client);
    res.status(201).send({
        message: "password updated"
    })
}

export default handler;