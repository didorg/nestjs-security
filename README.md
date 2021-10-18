# NestJS GraphQL and PostgreSQL Demo   
## Pet-Store in NestJS & GraphQL with PostgreSQL

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
### GraphQL endpoint  
`http://localhost:3000/graphql`  
  - Create a Pet:  
  ```
  mutation {
    createPet(PetInputDTO: { name: "Koty", type: "Parrot" }) {
      id
      name
      type
    }
  }
  ```   
  - Get all Owners:  
  ```
  query {
    owners {
      id
      name
      pets {
        id
        name
        type
      }
    }
  }
  ```  
  R/
  ```
 {
  "data": {
    "owners": [
      {
        "id": 1,
        "name": "Adam",
        "pets": [
          {
            "id": 1,
            "name": "Campeon",
            "type": "Dog"
          }
        ]
      },
      {
        "id": 3,
        "name": "Barack",
        "pets": []
      },
      {
        "id": 2,
        "name": "John",
        "pets": [
          {
            "id": 2,
            "name": "Zoee",
            "type": "Cat"
          },
          {
            "id": 3,
            "name": "Koty",
            "type": "Parrot"
          }
        ]
      }
    ]
  }
}
  ```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Debugging
https://javascript.plainenglish.io/debugging-nestjs-in-vscode-d474a088c63b

***********************************************

## Important notes    
 It's common to use `.env` files, holding key-value pairs where each key represents a particular value, to represent each environment.  
 A good approach for using this technique in Nest is to create a ConfigModule that exposes a ConfigService which loads the appropriate `.env` file.  
  - `.env` Ex:
    ```
    ## PostgreSQL DATABASE
    DB_HOST=your_HOST
    DB_PORT=5432
    DB_NAME=PET_STORE
    DB_USER=your_DB_User
    DB_PASS=your_PASS
    ```
    https://docs.nestjs.com/techniques/configuration  
