import CryptHash from "../../../infra/utils/CryptHash/CryptHash";
import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserAdmin1661470437780 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const crypt = new CryptHash();
        await queryRunner.query(`
            INSERT INTO permissions(id, permission)
            VALUES (uuid_generate_v4(), 'ADMIN'),
            (uuid_generate_v4(), 'SALER');
        `)

        const permission = await queryRunner.query(`
            SELECT * FROM permissions
            WHERE permission = 'ADMIN';
        `)

        await queryRunner.query(`
            INSERT INTO users(id, name, email, password, "permissionId")
            VALUES (uuid_generate_v4(), 'admin', 'admin@admin.com', '${await crypt.create('admin2022')}', '${permission[0].id}');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM users
            WHERE name = 'admin';
            
            DELETE FROM permissions
            WHERE permission = 'ADMIN';
        `)
    }

}
