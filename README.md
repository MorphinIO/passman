# Passman
Welcome to passman, a Password Manager utilizing a master password as a web-application

# Getting Started
First begin navigating to the API directory and copy .env.sample to a file .env and fill it out with your information.

Once that is done, open a terminal and move to the root directory. Run `yarn install` in the command line

Now move into the `api` directory and run this command
```
$  yarn dcu:db
```
This will start the database.

Now run these commands in the terminal
```
$  knex migrate:lastest
$  knex seed:run
```
This will initialize the database tables and seed them with initial data.

Now you are ready to run the back-end server. Simply run this command in the `api` directory to start the server
```
$  yarn dev
```

The api can now be interacted with at http://localhost:8080. I highly recommend utilizing postman to test it.

The Front-end of this application is currently not functioning, however it is all written. If you would like to run the front-end of this application, please have the database and api already running and in a new terminal do this:
Move to the root directory
and run this command 
```
$  yarn start
```
This will bootup the front-end client on [http://localhost:8081](http://localhost:8081)