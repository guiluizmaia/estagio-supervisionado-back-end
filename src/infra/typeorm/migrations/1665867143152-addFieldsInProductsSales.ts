import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addFieldsInProductsSales1665867143152 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExists = await queryRunner.query(`
        SELECT table_name 
        FROM information_schema.tables
        WHERE table_name='products_sales'    
    `);

    if(tableExists) {
        await queryRunner.addColumns('products_sales', 
        [                        
            new TableColumn({
                name: 'name',
                type: 'varchar',
            }),
            new TableColumn({
                name: 'price',
                type: 'decimal',
            })
        ]
        )
    }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('products_sales', ['name', 'price'])
    }

}
