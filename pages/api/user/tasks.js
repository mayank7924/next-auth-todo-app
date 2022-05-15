import {getSession} from 'next-auth/client'
import { connectToDb, query, closeConnection } from "../../../lib/db";

const handler = async (req, res) => {
    const session = await getSession({ req: req })

    if(!session) {
        res.status(401).json({message: "Not authorized"})
        return;
    }
    if(req.method === 'GET') {
        const userMobile = session.user.name;
        const client = await connectToDb();
        const getTasks = `SELECT t.id, t.body FROM tasks t INNER JOIN users u ON t.user_id=u.id WHERE u.mobile_number='${userMobile}';`;
        const tasks = await query(client, getTasks);
        await closeConnection(client);
        res.status(200).send({
            tasks
        })
        return;
    } else if(req.method === 'POST') {
        const userMobile = session.user.name;
        const client = await connectToDb();
        const getUser = `SELECT * FROM users where mobile_number='${userMobile}';`;
        const [user] = await query(client, getUser);
        const addTask = `INSERT INTO tasks (user_id, body) VALUES (${user.id}, '${req.body.task}');`;
        const response = await query(client, addTask);
        await closeConnection(client);
        res.status(201).send({
            response
        })
        return;
    } else if(req.method === 'PATCH') {
        const client = await connectToDb();
        console.log(req.body)
        const addTask = `UPDATE tasks SET body='${req.body.task}' WHERE id=${req.body.taskId};`;
        const response = await query(client, addTask);
        await closeConnection(client);
        res.status(201).send({
            response
        })
        return;
    } else if(req.method === 'DELETE') {
        const client = await connectToDb();
        const addTask = `DELETE FROM tasks WHERE id=${req.body.taskId};`;
        const response = await query(client, addTask);
        await closeConnection(client);
        res.status(201).send({
            response
        })
        return;
    }
}

export default handler;