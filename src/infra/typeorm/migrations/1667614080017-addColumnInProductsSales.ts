import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addColumnInProductsSales1667614080017 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('products_sales', 
        [                        
            new TableColumn({
                name: 'paidPriceForItem',
                type: 'decimal',
                isNullable: true
            })
        ]
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('products_sales', ['paidPriceForItem'])
    }

}
