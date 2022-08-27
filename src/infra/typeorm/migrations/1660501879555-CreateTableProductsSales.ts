import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTableProductsSales1660501879555 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExists = await queryRunner.query(`
            SELECT table_name 
            FROM information_schema.tables
            WHERE table_name='products_sales'    
        `);

        if(tableExists.length === 0) {
            await queryRunner.createTable(
                new Table({
                    name: 'products_sales',
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
                            name: 'saleId',
                            type: 'uuid',
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
                            name: 'productsSalesFK',
                            columnNames: ['productId'],
                            referencedColumnNames: ['id'],
                            referencedTableName: 'products'
                        }),
                        new TableForeignKey({
                            name: 'salesProductsFK',
                            columnNames: ['saleId'],
                            referencedColumnNames: ['id'],
                            referencedTableName: 'sales'
                        })
                    ]
                })
            )
        }
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("products_sales")

        if (table) {
            const foreignKey1 = table.foreignKeys.find(
                (fk) => fk.columnNames.indexOf("productId") !== -1,
            )
            if (foreignKey1) await queryRunner.dropForeignKey("products_sales", foreignKey1)
            
            const foreignKey2 = table.foreignKeys.find(
                (fk) => fk.columnNames.indexOf("saleId") !== -1,
            )
            if (foreignKey2) await queryRunner.dropForeignKey("products_sales", foreignKey2)
        }

        await queryRunner.dropTable('products_sales');
    }

}
