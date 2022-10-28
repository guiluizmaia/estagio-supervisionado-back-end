import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createTableInputProducts1665949938336 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExists = await queryRunner.query(`
            SELECT table_name 
            FROM information_schema.tables
            WHERE table_name='productsInput_products'    
        `);

        if(tableExists.length === 0) {
            await queryRunner.createTable(
                new Table({
                    name: 'productsInput_products',
                    columns: [
                        {
                            name: 'id',
                            type: 'uuid',
                            generationStrategy: 'uuid',
                            isPrimary: true,
                            default: `uuid_generate_v4()`
                        },
                        {
                            name: 'productsInputId',
                            type: 'uuid',
                        },
                        {
                            name: 'productId',
                            type: 'uuid',
                        },                        
                        {
                            name: 'name',
                            type: 'varchar',
                        },
                        {                        
                            name: 'price',
                            type: 'decimal',
                            isNullable: true,
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
                    foreignKeys: [
                        new TableForeignKey({
                            name: 'productsInputFK',
                            columnNames: ['productId'],
                            referencedColumnNames: ['id'],
                            referencedTableName: 'products'
                        }),
                        new TableForeignKey({
                            name: 'productsInputProductsFK',
                            columnNames: ['productsInputId'],
                            referencedColumnNames: ['id'],
                            referencedTableName: 'productsInput'
                        })
                    ]
                })
            )
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("productsInput_products")

        if (table) {
            const foreignKey1 = table.foreignKeys.find(
                (fk) => fk.columnNames.indexOf("productId") !== -1,
            )
            if (foreignKey1) await queryRunner.dropForeignKey("productsInput_products", foreignKey1)
            
            const foreignKey2 = table.foreignKeys.find(
                (fk) => fk.columnNames.indexOf("productsInputId") !== -1,
            )
            if (foreignKey2) await queryRunner.dropForeignKey("productsInput_products", foreignKey2)
        }

        await queryRunner.dropTable('productsInput_products');
    }

}
