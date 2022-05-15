import { connectToDb, query, closeConnection } from "../../../lib/db";
import { hash } from "../../../lib/hash";

const handler = async (req, res) => {
  if (req.method !== "POST") return;
  let status, message;
  const client = await connectToDb();
  const { mobile, password } = req.body;
  if (
    !mobile ||
    !mobile.match(/^\d{10}$/ || !password || password.trim().length < 7)
  ) {
    res.status(422).json({
      message:
        "please check the entered credentials, password should be at least 7 characters long",
    });
  }
  const get = `SELECT id FROM users where mobile_number='${mobile}';`;
  const exists = await query(client, get);
  console.log(exists)
  if (exists.length>0) {
   status = 422;
   message = "mobile number already registered";
  } else {
    const insert = `INSERT INTO users (mobile_number, password) VALUES ('${mobile}', '${hash(password)}');`
    const result = await query(client, insert);
    status = 202;
   message = "user signup successful";
  }
  await closeConnection(client);
  res.status(status).json({ message });
};

export default handler;
