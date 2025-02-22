import { MikroORM } from "@mikro-orm/core";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";
import dotenv from "dotenv";

dotenv.config();
export const sqlName = process.env.dbName;

export const urlSQL = process.env.urlSQL;

export const orm = await MikroORM.init({
  entities: ["dist/**/*.entity.js"],
  entitiesTs: ["src/**/*.entity.ts"],
  dbName: `${sqlName}`,
  type: "mysql",
  clientUrl: `${urlSQL}`,
  highlighter: new SqlHighlighter(),
  debug: true,

  schemaGenerator: {
    disableForeignKeys: true,
    createForeignKeyConstraints: true,
    ignoreSchema: [],
  },
});

export const syncSchema = async () => {
  const generator = orm.getSchemaGenerator();

  // await generator.dropSchema();
  // await generator.createSchema();

  await generator.updateSchema();
};
