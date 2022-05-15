const mysql = require("mysql2/promise");

export const connectToDb = async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    port: 13306,
    user: "root",
    password: "s3cr3ts1z3d",
    database: "test",
  });
  return connection;
};

export const closeConnection = async(connection) => connection.end()

export const query = async (client, query) => {
  try {
    const result = await client.query(query);
    return result[0];
  } catch (e) {
    throw e;
  }
};
