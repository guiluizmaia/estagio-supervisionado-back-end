import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableProductHistoric1663725088349 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExists = await queryRunner.query(`
            SELECT table_name 
            FROM information_schema.tables
            WHERE table_name='productsHistoric'    
        `);

        if(tableExists.length === 0) {
            await queryRunner.createTable(
                new Table({
                    name: 'productsHistoric',
                    columns: [
                        {
                            name: 'id',
                            type: 'uuid',
                            generationStrategy: 'uuid',
                            isPrimary: true,
                            default: `uuid_generate_v4()`
                        },
                        {
                            name: 'productId',
                            type: 'uuid',
                        },
                        {
                            name: 'paidPrice',
                            type: 'decimal',
                            isNullable: true
                        },
                        {
                            name: 'type',
                            type: 'varchar',
                        },
                        {
                            name: 'qntd',
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
                    ],
                })
            )
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('productsHistoric');
    }
}
