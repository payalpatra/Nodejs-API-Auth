# Nodejs-API-Auth

### Setup Guidlines

#### STEP 1

 ```sh
 git clone https://github.com/payalpatra/Nodejs-API-Auth.git
   ```

#### STEP 2
###### (Make sure to run this in the root directory) 

 ```sh
   npm install
   ```

#### STEP 3
###### (Create .env file in the root directory with the following Variable) 

  ```sh
   DB_CONNECT =mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.ifcel.mongodb.net/<DBNAME>?retryWrites=true&w=majority
   TOKEN_SECRET= thisIsTheToken
   ```

* ##### Starting the server
###### (Make sure to run this in the root directory)
```sh
 nodemon server
   ```

