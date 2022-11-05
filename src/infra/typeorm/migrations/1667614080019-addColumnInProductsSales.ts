import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addColumnInProductsSales1667614080019 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('products_sales', 
        [                        
            new TableColumn({
                name: 'providerId',
                type: 'varchar',
                isNullable: true
            }),
            new TableColumn({
                name: 'providerName',
                type: 'varchar',
                isNullable: true
            })
        ]
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('products_sales', ['providerId', 'providerName'])
    }

}
