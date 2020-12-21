import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddPlanetIdToTraveler1608404979843 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'traveler',
      new TableColumn({ name: 'planet_id', type: 'uuid', isNullable: true }),
    );

    await queryRunner.createForeignKey(
      'traveler',
      new TableForeignKey({
        columnNames: ['planet_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'planet',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('traveler');

    const foreignKey = table.foreignKeys.find(
      fk => fk.columnNames.indexOf('planet_id') !== -1,
    );

    await queryRunner.dropForeignKey('traveler', foreignKey);
    await queryRunner.dropColumn('traveler', 'planet_id');
  }
}
