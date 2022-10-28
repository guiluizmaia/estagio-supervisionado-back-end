import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addFieldsInSales1665946934710 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('sales', 
        [                        
            new TableColumn({
                name: 'canceled',
                type: 'boolean',
                default: 'False'
            })
        ]
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('sales', ['sales'])
    }

}
