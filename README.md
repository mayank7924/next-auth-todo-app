## Getting Started

- Setup a test MySQL server as a docker container by running the following command from the project root directory:

```
docker compose up
```

Please note that the docker MySQL container is being exposed from the port 13306 instead of the default 3306

- Create table and seed data: 
```
run the sql script /db-script/run-after-compose.sql
```
seeding is needed as the user needs to be present to login into the app

- Then, install all the npm dependencies using the following command:

```
npm install
```

- Run the development server:

```bash
npm run dev
```
- Login with the mobile: 9999999999, password: password123

- Navigate to the Tasks tab to add/edit/remove tasks

- Navigate to Profile tab to update password 