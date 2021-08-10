# Pokedex API

An easy to use API to get data of pokemons from pokemon game franchise. get info about a pokemon, save it or remove it from your pokemons.


Try it out now at https://pokedex-rosy-mu.vercel.app/login

## About

This is an api with routes to get data from pokemon from a database, lots of people can view and save your pokemons in a list.\
Below are the implemented features:

- Sign Up
- Login
- List all pokemons in database
- Add new pokemon in your pokemons
- remove a pokemon from your pokemons

By using this app any user manage your list of pokemons and get infos about them.

## Technologies
The following tools and frameworks were used in the construction of the project:<br>
<p>
  <img style='margin: 5px;' src='https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=whiteE'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white'>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white"/>
</p>

## How to run

1. Clone this repository
2. create a postgres Database named pokedex
3. create a .env like .env.example with your database values
4. Install dependencies
```
npm i
```
5. create and run migrations for your database:
```
npm run build
```
6.start server with:
```
npm run dev
```
7.Finally access http://localhost:4000/routename changing 'routename' for the route you wanna call on postman or in front-end: 
