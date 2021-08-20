Slack Automessaging
====

Technologies Required
---
1. NodeJS
2. PostgreSQL


Steps to start the application
---
1. Clone the Directory
2. Setup PostgreSQL on the machine and enter the details in app/config/db.config.js
3. Run Npm Install
4. Go To Index.js and uncomment the following section -    db.sequelize.sync({ force: true })... (Line 16 to 18) (This is necessary only for the first time when you setup the application on your machine)
5. Run Node Index.js on the command line
6. Exit the program, and comment the lines 16 to 18 again.
7. From now on you can run the application again by using command Node Index.js on the command line
8. If you want to change the timings of the messages being sent it is available in Index.js