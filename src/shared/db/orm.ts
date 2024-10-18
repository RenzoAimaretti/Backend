import { MikroORM } from "@mikro-orm/core";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";

export const orm = await MikroORM.init({
  entities: ["dist/**/*.entity.js"],
  entitiesTs: ["src/**/*.entity.ts"],
  dbName: "backenddsw",
  type: "mysql",
  clientUrl: "mysql://tpdsw:tpdsw@localhost:3306/",
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
  /*
    await generator.dropSchema()
    await generator.createSchema()
     */
  await generator.updateSchema();
};
