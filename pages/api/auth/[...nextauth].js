import NextAuth from 'next-auth';
import Providers from 'next-auth/providers'
import { closeConnection, connectToDb, query } from '../../../lib/db';
import { hash } from '../../../lib/hash';

export default NextAuth({
    session: {
        jwt: true
    },
    providers: [
        Providers.Credentials({
            async authorize(credentials) {
                const client = await connectToDb();
                const get = `SELECT * FROM users where mobile_number='${credentials.mobile}';`;
                const user = await query(client, get);
                if(!user[0]) {
                    throw new Error("No user found")
                }
                const auth = user[0].password == hash(credentials.password)
                if(!auth){
                    throw new Error("incorrect password")
                }
                closeConnection(client);
                console.log("new jwt mint:", {
                    name: credentials.mobile
                })
                return {
                    name: credentials.mobile,
                }
            }
        })
    ]
});