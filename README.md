# Setup DB

### To setup DB

Install `mongodb`, `mongosh`, add it in the path in environment variables.

### To start the DB

    mongod --dbpath C:\ProgramData\MongoDB\data\db

### To create the DB,

    use todoapp

### To create user creds for us to connect from the API

    db.createUser({user: "todo", pwd: "todo", roles: ["readWrite"]})

# Building and running the app

## Running the app in local container

    docker build -t todo-app-ui .
    docker run -d -it -p 80:80/tcp todo-app-ui

You can access the app using localhost:80

## Running the node API in local container

    docker build -t todo-app-api .
    docker run -d -it -p 3000:3000/tcp todo-app-api

## Or you can create a image in the dockerhub and build it this way

    docker build -t krishnathota/todo-app-ui:0-alpha-1 .
    docker build -t krishnathota/todo-app-api:0-alpha-1 .

# Building MongoDB in an image.

    docker run 2717:27017 -v ~/todo-app-db:/data/db --name todo-app-mongodb mongo:latest
