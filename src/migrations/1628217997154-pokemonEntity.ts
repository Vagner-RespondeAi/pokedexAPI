import { MigrationInterface, QueryRunner } from "typeorm";

export class pokemonEntity1628217997154 implements MigrationInterface {
  name = "pokemonEntity1628217997154";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "pokemons" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "number" integer NOT NULL, "image" character varying NOT NULL, "weight" character varying NOT NULL, "height" character varying NOT NULL, "baseExp" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_a3172290413af616d9cfa1fdc9a" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "pokemons_users_users" ("pokemonsId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_15184e7b10aabbc5e97c2129c8b" PRIMARY KEY ("pokemonsId", "usersId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_703c8f8041ef2c3585514339c1" ON "pokemons_users_users" ("pokemonsId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7ab03e9faba604ae4b3a0b76fd" ON "pokemons_users_users" ("usersId") `
    );
    await queryRunner.query(
      `ALTER TABLE "pokemons_users_users" ADD CONSTRAINT "FK_703c8f8041ef2c3585514339c18" FOREIGN KEY ("pokemonsId") REFERENCES "pokemons"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "pokemons_users_users" ADD CONSTRAINT "FK_7ab03e9faba604ae4b3a0b76fd4" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pokemons_users_users" DROP CONSTRAINT "FK_7ab03e9faba604ae4b3a0b76fd4"`
    );
    await queryRunner.query(
      `ALTER TABLE "pokemons_users_users" DROP CONSTRAINT "FK_703c8f8041ef2c3585514339c18"`
    );
    await queryRunner.query(`DROP INDEX "IDX_7ab03e9faba604ae4b3a0b76fd"`);
    await queryRunner.query(`DROP INDEX "IDX_703c8f8041ef2c3585514339c1"`);
    await queryRunner.query(`DROP TABLE "pokemons_users_users"`);
    await queryRunner.query(`DROP TABLE "pokemons"`);
  }
}
