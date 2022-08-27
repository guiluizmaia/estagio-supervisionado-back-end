import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTableProducts1660494961083 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExists = await queryRunner.query(`
            SELECT table_name 
            FROM information_schema.tables
            WHERE table_name='products'    
        `);

        if(tableExists.length === 0) {
            await queryRunner.createTable(
                new Table({
                    name: 'products',
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
                            name: 'providerId',
                            type: 'uuid',
                        },
                        {
                            name: 'name',
                            type: 'varchar(100)',
                        },
                        {
                            name: 'description',
                            type: 'varchar(255)',
                        },
                        {
                            name: 'paidPrice',
                            type: 'decimal',
                        },
                        {
                            name: 'salePrice',
                            type: 'decimal',
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
                    foreignKeys: [
                        new TableForeignKey({
                            name: 'productsUsersFK',
                            columnNames: ['userId'],
                            referencedColumnNames: ['id'],
                            referencedTableName: 'users'
                        }),
                        new TableForeignKey({
                            name: 'productsProvidersFK',
                            columnNames: ['providerId'],
                            referencedColumnNames: ['id'],
                            referencedTableName: 'providers'
                        })
                    ]
                })
            )
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("products")

        if (table) {
            const foreignKey1 = table.foreignKeys.find(
                (fk) => fk.columnNames.indexOf("userId") !== -1,
            )
            if (foreignKey1) await queryRunner.dropForeignKey("products", foreignKey1)

            const foreignKey2 = table.foreignKeys.find(
                (fk) => fk.columnNames.indexOf("providerId") !== -1,
            )
            if (foreignKey2) await queryRunner.dropForeignKey("products", foreignKey2)
        }

        await queryRunner.dropTable('products');
    }

}
