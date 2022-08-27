import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTableSales1660501541211 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExists = await queryRunner.query(`
            SELECT table_name 
            FROM information_schema.tables
            WHERE table_name='sales'    
        `);

        if(tableExists.length === 0) {
            await queryRunner.createTable(
                new Table({
                    name: 'sales',
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
                            name: 'usersId',
                            type: 'uuid',
                        },
                        {
                            name: 'formPaymentId',
                            type: 'uuid',
                        },
                        {
                            name: 'amount',
                            type: 'decimal',
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
                            name: 'salesClientFK',
                            columnNames: ['clientsId'],
                            referencedColumnNames: ['id'],
                            referencedTableName: 'clients'
                        }),
                        new TableForeignKey({
                            name: 'salesUserFK',
                            columnNames: ['usersId'],
                            referencedColumnNames: ['id'],
                            referencedTableName: 'users'
                        }),
                        new TableForeignKey({
                            name: 'salesFormPaymentFK',
                            columnNames: ['formPaymentId'],
                            referencedColumnNames: ['id'],
                            referencedTableName: 'formPayment'
                        })
                    ]
                })
            )
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("sales")

        if (table) {
            const foreignKey1 = table.foreignKeys.find(
                (fk) => fk.columnNames.indexOf("clientsId") !== -1,
            )
            if (foreignKey1) await queryRunner.dropForeignKey("sales", foreignKey1)
            
            const foreignKey2 = table.foreignKeys.find(
                (fk) => fk.columnNames.indexOf("usersId") !== -1,
            )
            if (foreignKey2) await queryRunner.dropForeignKey("sales", foreignKey2)

            const foreignKey3 = table.foreignKeys.find(
                (fk) => fk.columnNames.indexOf("formPaymentId") !== -1,
            )
            if (foreignKey3) await queryRunner.dropForeignKey("sales", foreignKey3)
        }

        await queryRunner.dropTable('sales');
    }

}
