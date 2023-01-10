
# My first attempt to build an application using React and Typescript. 
This is a simple react application that demonstrates CRUD functionality along with some client side features like pagination, search, sort, filter and form validation.

I have used ASP.NET core 6 for the backend service and Mongo Db as the database.

To run this application locally, you can do the following:
- Clone the repo
- Install docker if you haven't already
- Run the following commands in terminal at the root of the project folder.
  - docker compose build
  - docker compose up -d
- Once the containers are up and running, 
  - Frontend is available at http://localhost:3000/.
    -  <b>Note: Please add atleast 6-7 books to view pagination.</b>
  - Backend is available at  http://localhost:3001/swagger
  - Dozzle is available at http://localhost:8888/
     - dozzle is a log viewer for docker containers. Refer to https://dozzle.dev/ if you would like to learn more about it.



