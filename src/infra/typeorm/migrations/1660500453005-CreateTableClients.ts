import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableClients1660500453005 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExists = await queryRunner.query(`
            SELECT table_name 
            FROM information_schema.tables
            WHERE table_name='clients'    
        `);

        if(tableExists.length === 0) {
            await queryRunner.createTable(
                new Table({
                    name: 'clients',
                    columns: [
                        {
                            name: 'id',
                            type: 'uuid',
                            generationStrategy: 'uuid',
                            isPrimary: true,
                            default: `uuid_generate_v4()`
                        },
                        {
                            name: 'name',
                            type: 'varchar(100)',
                        },
                        {
                            name: 'rg',
                            type: 'varchar(12)',
                        },
                        {
                            name: 'cpf',
                            type: 'varchar(11)',
                        },
                        {
                            name: 'active',
                            type: 'boolean',
                        },
                        {
                            name: 'userId',
                            type: 'uuid',
                        },
                        {
                            name: 'initDate',
                            type: 'timestamp',
                            default: 'now()',
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
                    ]
                })
            )
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('clients');
    }

}
