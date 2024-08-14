import { MikroORM } from "@mikro-orm/core";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";
export const orm = await MikroORM.init({
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    dbName: 'backenddsw',
    type: 'mysql',
    clientUrl: 'mysql://tpdsw:tpdsw@localhost:3306/',
    highlighter: new SqlHighlighter(),
    debug: true,
    seeder: {
        path: 'src/shared/db/seeders',
        pathTs: undefined, // path to the folder with TS seeders (if used, we should put path to compiled files in `path`)
        defaultSeeder: 'DatabaseSeeder', // default seeder class name
        glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
        emit: 'ts', // seeder generation mode
        fileName: (className) => className,
    },
    schemaGenerator: {
        disableForeignKeys: true,
        createForeignKeyConstraints: true,
        ignoreSchema: [],
    }
});
export const syncSchema = async () => {
    const generator = orm.getSchemaGenerator();
    /*
    await generator.dropSchema()
    await generator.createSchema()
     */
    await generator.updateSchema();
};
//# sourceMappingURL=mikro-orm.config.js.map