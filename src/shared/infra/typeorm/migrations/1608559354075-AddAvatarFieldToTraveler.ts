import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddAvatarFieldToTraveler1608559354075
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'traveler',
      new TableColumn({
        name: 'avatar',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('traveler', 'avatar');
  }
}
