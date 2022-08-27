import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTableAddresses1660498342064 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExists = await queryRunner.query(`
            SELECT table_name 
            FROM information_schema.tables
            WHERE table_name='addresses'    
        `);

        if(tableExists.length === 0) {
            await queryRunner.createTable(
                new Table({
                    name: 'addresses',
                    columns: [
                        {
                            name: 'id',
                            type: 'uuid',
                            generationStrategy: 'uuid',
                            isPrimary: true,
                            default: `uuid_generate_v4()`
                        },
                        {
                            name: 'zipCode',
                            type: 'varchar(8)',
                        },
                        {
                            name: 'street',
                            type: 'varchar(100)',
                        },
                        {
                            name: 'complement',
                            type: 'varchar(255)',
                        },
                        {
                            name: 'district',
                            type: 'varchar(100)',
                        },
                        {
                            name: 'city',
                            type: 'varchar(100)',
                        },
                        {
                            name: 'state',
                            type: 'varchar(100)',
                        },
                        {
                            name: 'number',
                            type: 'integer',
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
        await queryRunner.dropTable('addresses')
    }

}
