import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTableClientsPhones1660500631176 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExists = await queryRunner.query(`
            SELECT table_name 
            FROM information_schema.tables
            WHERE table_name='clients_phones'    
        `);

        if(tableExists.length === 0) {
            await queryRunner.createTable(
                new Table({
                    name: 'clients_phones',
                    columns: [
                        {
                            name: 'id',
                            type: 'uuid',
                            generationStrategy: 'uuid',
                            isPrimary: true,
                            default: `uuid_generate_v4()`
                        },
                        {
                            name: 'clientsId',
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
                            name: 'clientsPhoneFK',
                            columnNames: ['clientsId'],
                            referencedColumnNames: ['id'],
                            referencedTableName: 'clients'
                        }),
                        new TableForeignKey({
                            name: 'phonesClientsFK',
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
        const table = await queryRunner.getTable("clients_phones")

        if (table) {
            const foreignKey1 = table.foreignKeys.find(
                (fk) => fk.columnNames.indexOf("clientsId") !== -1,
            )
            if (foreignKey1) await queryRunner.dropForeignKey("clients_phones", foreignKey1)
            
            const foreignKey2 = table.foreignKeys.find(
                (fk) => fk.columnNames.indexOf("phonesId") !== -1,
            )
            if (foreignKey2) await queryRunner.dropForeignKey("clients_phones", foreignKey2)
        }

        await queryRunner.dropTable('clients_phones');
    }

}
