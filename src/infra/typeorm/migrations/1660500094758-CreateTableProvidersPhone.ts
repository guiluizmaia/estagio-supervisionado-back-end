import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTableProvidersPhone1660500094758 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExists = await queryRunner.query(`
            SELECT table_name 
            FROM information_schema.tables
            WHERE table_name='providers_phones'    
        `);

        if(tableExists.length === 0) {
            await queryRunner.createTable(
                new Table({
                    name: 'providers_phones',
                    columns: [
                        {
                            name: 'id',
                            type: 'uuid',
                            generationStrategy: 'uuid',
                            isPrimary: true,
                            default: `uuid_generate_v4()`
                        },
                        {
                            name: 'providersId',
                            type: 'uuid',
                        },
                        {
                            name: 'phonesId',
                            type: 'uuid',
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
                            name: 'providersPhoneFK',
                            columnNames: ['providersId'],
                            referencedColumnNames: ['id'],
                            referencedTableName: 'providers'
                        }),
                        new TableForeignKey({
                            name: 'phoneProvidersFK',
                            columnNames: ['phonesId'],
                            referencedColumnNames: ['id'],
                            referencedTableName: 'phones'
                        })
                    ]
                })
            )
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("providers_phones")

        if (table) {
            const foreignKey1 = table.foreignKeys.find(
                (fk) => fk.columnNames.indexOf("providersId") !== -1,
            )
            if (foreignKey1) await queryRunner.dropForeignKey("providers_phones", foreignKey1)
            
            const foreignKey2 = table.foreignKeys.find(
                (fk) => fk.columnNames.indexOf("phonesId") !== -1,
            )
            if (foreignKey2) await queryRunner.dropForeignKey("providers_phones", foreignKey2)
        }

        await queryRunner.dropTable('providers_phones');
    }

}
