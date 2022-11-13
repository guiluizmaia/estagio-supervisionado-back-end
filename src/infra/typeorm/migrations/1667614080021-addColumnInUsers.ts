import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addColumnInUsers1667614080021 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('users', 
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
        await queryRunner.dropColumns('users', ['exclude'])
    }

}
