
# Adonis Books Serach App

To run the project please follow these steps and add google books api key in .env.example:

- Create new directory and CD into it
```cmd

$ mkdir danish-test
$ cd ./danish-test

```

- Clone the git repo and CD into it
```cmd

$ git clone  https://github.com/danishmirza/adronis-bookmark-project.git
$ cd ./adronis-bookmark-project
$ cp .env.example .env

```

- Start Docker compose file
```cmd

$ docker compose up -d

```

- Check if containers are running fine. You should see 4 containers
```cmd

$ docker ps

```

- Run migrations
```cmd

$ docker exec -it adonis_app /bin/sh
$ node ace migration:run

```

- Import postman Collection from this link
```cmd

$ https://api.postman.com/collections/2167194-a7a2758d-4513-4e06-ae3d-8f8be1eaefb3?access_key=PMAT-01H9Z70BFASHY7628AJCJGBQBD

```

After this the system is running and you can use the system

## Api Description

- Login
- Register
- Search Books Api (without auth and redis caching implemented)
- Mark book as favourite (If authenticated)
- List favourite books (if authenticated)
