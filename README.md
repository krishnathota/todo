# todo app

### To setup DB

Install `mongodb`, `mongosh`, add it in the path in environment variables.

### To start the DB

    mongod --dbpath C:\ProgramData\MongoDB\data\db

### To create the DB,

    use todoapp

### To create user creds for us to connect from the API

    db.createUser({user: "todo", pwd: "todo", roles: ["readWrite"]})
