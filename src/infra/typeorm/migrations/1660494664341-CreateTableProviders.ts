import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTableProviders1660494664341 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExists = await queryRunner.query(`
            SELECT table_name 
            FROM information_schema.tables
            WHERE table_name='providers'    
        `);
        if(tableExists.length === 0) {
            await queryRunner.createTable(
                new Table({
                    name: 'providers',
                    columns: [
                        {
                            name: 'id',
                            type: 'uuid',
                            generationStrategy: 'uuid',
                            isPrimary: true,
                            default: `uuid_generate_v4()`
                        },
                        {
                            name: 'userId',
                            type: 'uuid',
                        },
                        {
                            name: 'name',
                            type: 'varchar(100)',
                        },
                        {
                            name: 'cnpj',
                            type: 'varchar(14)',
                        },
                        {
                            name: 'obs',
                            type: 'varchar(255)',
                        },
                        {
                            name: 'email',
                            type: 'varchar(50)',
                        },
                        {
                            name: 'created_at',
                            type: 'timestamp',
                            default: 'now()',
                        },
                        {
                            name: 'updated_at',
                            type: 'timestamp',
                            default: 'now()',
                        }
                    ],
                    foreignKeys: [
                        new TableForeignKey({
                            name: 'providersUsersFK',
                            columnNames: ['userId'],
                            referencedColumnNames: ['id'],
                            referencedTableName: 'users',
                        })
                    ]
                })
            )
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("providers")

        if (table) {
            const foreignKey = table.foreignKeys.find(
                (fk) => fk.columnNames.indexOf("userId") !== -1,
            )
            if (foreignKey) await queryRunner.dropForeignKey("providers", foreignKey)
        }
        
        await queryRunner.dropTable('providers')
    }

}
