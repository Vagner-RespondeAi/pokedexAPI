import { getRepository } from "typeorm";
import faker from "faker"
import bcrypt from "bcrypt"

import User from "../../src/entities/User";

export function createNewUser () {
  const newpass=faker.internet.password()
  const user = {
    email: faker.internet.email(),
    password: newpass,
    confirmPassword: newpass
  };
  return user;
}

export async function registerUser(){
  const password = faker.internet.password()
  const repository = getRepository(User)
  const user = repository.create({
      email: faker.internet.email(),
      password: bcrypt.hashSync(password,10)
  });
  await repository.save(user)
  return {
    email:user.email,
    password
  };
}
