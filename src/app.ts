import "./setup";

import express, {Request,Response,NextFunction} from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";

import * as userController from "./controllers/userController";
import * as pokemonController from "./controllers/pokemonController";
import authenticate from "./middlewares/authenticate";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", userController.signUp);
app.post("/sign-in", userController.signIn);

app.get("/pokemons",authenticate,pokemonController.getAll)


app.use((err:any,req:Request,res:Response,next:NextFunction)=>{
  console.log(err)
  return res.sendStatus(500)
})
export async function init () {
  await connectDatabase();
}

export default app;
