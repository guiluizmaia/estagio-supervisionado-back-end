import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTableUsers1660493835705 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExists = await queryRunner.query(`
            SELECT table_name 
            FROM information_schema.tables
            WHERE table_name='users'    
        `);

        if(tableExists.length === 0) {
            await queryRunner.createTable(
                new Table({
                    name: 'users',
                    columns: [
                        {
                            name: 'id',
                            type: 'uuid',
                            generationStrategy: 'uuid',
                            isPrimary: true,
                            default: `uuid_generate_v4()`
                        },
                        {
                            name: 'permissionId',
                            type: 'uuid',
                        },
                        {
                            name: 'name',
                            type: 'varchar(100)',
                        },
                        {
                            name: 'email',
                            type: 'varchar(50)',
                        },
                        {
                            name: 'password',
                            type: 'varchar(255)',
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
                            name: 'usersPermissionsFK',
                            columnNames: ['permissionId'],
                            referencedColumnNames: ['id'],
                            referencedTableName: 'permissions'
                        })
                    ]
                })
            )
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("users")

        if (table) {
            const foreignKey = table.foreignKeys.find(
                (fk) => fk.columnNames.indexOf("permissionId") !== -1,
            )
            if (foreignKey) await queryRunner.dropForeignKey("users", foreignKey)
        }

        await queryRunner.dropTable('users');
    }

}
