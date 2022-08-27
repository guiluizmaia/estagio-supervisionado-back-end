import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTableProvidersAddresses1660498968733 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExists = await queryRunner.query(`
            SELECT table_name 
            FROM information_schema.tables
            WHERE table_name='providers_addresses'    
        `);

        if(tableExists.length === 0) {
            await queryRunner.createTable(
                new Table({
                    name: 'providers_addresses',
                    columns: [
                        {
                            name: 'id',
                            type: 'uuid',
                            generationStrategy: 'uuid',
                            isPrimary: true,
                            default: `uuid_generate_v4()`
                        },
                        {
                            name: 'addressesId',
                            type: 'uuid',
                        },
                        {
                            name: 'providersId',
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
                            name: 'addressesProvidersFK',
                            columnNames: ['addressesId'],
                            referencedColumnNames: ['id'],
                            referencedTableName: 'addresses'
                        }),
                        new TableForeignKey({
                            name: 'providersAddressesFK',
                            columnNames: ['providersId'],
                            referencedColumnNames: ['id'],
                            referencedTableName: 'providers'
                        })
                    ]
                })
            )
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("providers_addresses")

        if (table) {
            const foreignKey1 = table.foreignKeys.find(
                (fk) => fk.columnNames.indexOf("addressesId") !== -1,
            )
            if (foreignKey1) await queryRunner.dropForeignKey("providers_addresses", foreignKey1)
            
            const foreignKey2 = table.foreignKeys.find(
                (fk) => fk.columnNames.indexOf("providersId") !== -1,
            )
            if (foreignKey2) await queryRunner.dropForeignKey("providers_addresses", foreignKey2)
        }

        await queryRunner.dropTable('providers_addresses');
    }

}
