# About
This is a starter project containing:
* React (frontend)
* Nest with TypeORM (backend)
* MySQL (database)

# Starting the project
1. Clone the repo
2. Install Docker on your PC
3. Launch Docker
4. Run: `docker-compose up` from the root directory
    * frontend is launched at http://localhost:8080/ 
    * backend is launched at http://localhost:3000/api 
    * database is launched at http://localhost:3306/

In case of problems with Docker, you can clean it by executing these two commands:
```
docker rm -f $(docker ps -a -q) 
docker system prune -a -f --volumes
```


# Accessing the database
1. Install MySQL Workbench or a similar tool
2. Create a new connection with details from `.env` file:
    ```
    hostname=127.0.0.1
    username=yourUser
    port=3306
    password=password
    ```

# Installing npm packages
You can install them locally. A watcher in the container is waiting for changes in your package.json and package-lock.json to replicate the installation you have done locally.

In case of problems, force rebuild of the containers:
```
docker-compose up -V --build
```

# Backend documentation
This starter project already contains a Postman environment and documentation in `./backend/postman/`. We can extend that.

# Credits
Original starter project: https://github.com/arthurPrvst/starter-reactjs-nestjs-mysql.