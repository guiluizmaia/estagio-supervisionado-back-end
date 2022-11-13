import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addColumnInProducts1667614080020 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('products', 
        [                        
            new TableColumn({
                name: 'exclude',
                type: 'boolean',
                default: false
            })
        ]
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('products_sales', ['providerId', 'providerName'])
    }

}
