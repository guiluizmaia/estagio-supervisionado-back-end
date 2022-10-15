import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addFieldsInFormPayment1665868562992 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('formPayment', 
        [                        
            new TableColumn({
                name: 'active',
                type: 'boolean',
                default: 'True'
            })
        ]
        )
    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('formPayment', ['active'])
    }

}
