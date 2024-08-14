import { MikroORM , defineConfig} from "@mikro-orm/core";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";
import { Seeder,SeedManager } from "@mikro-orm/seeder";
import { MySqlDriver } from "@mikro-orm/mysql";


  
export const orm = await MikroORM.init<MySqlDriver>({
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    dbName: 'backenddsw',
    type: 'mysql',
    clientUrl: 'mysql://tpdsw:tpdsw@localhost:3306/',
    highlighter: new SqlHighlighter(),
    debug: true,
    seeder: {
        path: 'src/shared/db/seeders',
        pathTs: undefined,
        defaultSeeder: 'DatabaseSeeder', 
        glob: '!(*.d).{js,ts}', 
        emit: 'ts', 
        fileName: (className: string) => className, 
    },

    schemaGenerator:{
        disableForeignKeys:true,
        createForeignKeyConstraints:true,
        ignoreSchema:[],
    }
})

export const syncSchema= async()=> {
    const generator=orm.getSchemaGenerator()
    /*
    await generator.dropSchema()
    await generator.createSchema()
     */
    await generator.updateSchema()
}