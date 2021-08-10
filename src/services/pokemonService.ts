import { getRepository } from "typeorm";
import Pokemon from "../entities/Pokemon";
import User from "../entities/User";

interface PokemonResponse {
  id: number;
  name: string;
  number: number;
  image: string;
  weight: number;
  height: number;
  baseExp: number;
  description: string;
  inMyPokemons: boolean;
}

export async function getAll(user: User): Promise<PokemonResponse[]> {
  const repository = getRepository(Pokemon);
  const pokemons = await repository
    .createQueryBuilder("pokemon")
    .leftJoinAndSelect("pokemon.users", "user", "user.id = :userId", {
      userId: user.id,
    })
    .orderBy("pokemon.id", "ASC")
    .getMany();
  const pokemonResponse: PokemonResponse[] = pokemons.map((p: Pokemon) => {
    return {
      id: p.id,
      name: p.name,
      number: p.number,
      image: p.image,
      weight: p.weight,
      height: p.height,
      baseExp: p.baseExp,
      description: p.description,
      inMyPokemons: p.users.length > 0,
    };
  });

  return pokemonResponse;
}

export async function changeUserPokemons(id: number, user: User, type: string) {
  const repository = getRepository(Pokemon);
  const pokemon = await repository.findOne({
    where: { id },
    relations: ["users"],
  });
  pokemon.users =
    type === "add"
      ? [...pokemon.users, user]
      : pokemon.users.filter((u) => u.id !== user.id);
  await repository.save(pokemon);
}
