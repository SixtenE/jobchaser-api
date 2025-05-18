# Workshop - Använda Prisma ORM för databashantering i ett REST API 👋 

## Diskutera

* Vad gör en ORM? Vad är Prisma?
* Vad är principerna för ett REST API? 

## Din uppgift

Ni ska utgå från befintligt REST API och använda Prisma ORM för databashantering. Kodbasen för detta finns i detta repo och är samma som utifrån lektion 5 mars 2025.

1. Setup med Prisma [enligt denna guide](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-mysql)
2. Skapa databasuppkoppling med Prisma och använd lokal MySQL-databas med MAMP
3. Definera ert schema i ```prisma/schema.prisma```. En model för User och en för Post. Ange primärnyckel och även relationen därimellan.
4. Följ guiden för migration och hur du använder Prisma/Client. 
5. Byt ut databashantering för varje controller i ```userController.ts``` samt ```postController.ts``` skriven med  ```mysql2``` till Prismas CRUD-funktioner. Dokumentationen om [CRUD på prisma.io finns här](https://www.prisma.io/docs/orm/prisma-client/queries/crud).


## Diskutera igen

1. Vad är fördelerna med en ORM?
2. Vad är nackdelarna?