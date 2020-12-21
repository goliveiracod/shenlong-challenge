import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddGalaxyIdToPlanet1608554757400 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'planet',
      new TableColumn({ name: 'galaxy_id', type: 'uuid', isNullable: true }),
    );

    await queryRunner.createForeignKey(
      'planet',
      new TableForeignKey({
        columnNames: ['galaxy_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'galaxy',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('planet');

    const foreignKey = table.foreignKeys.find(
      fk => fk.columnNames.indexOf('galaxy_id') !== -1,
    );

    await queryRunner.dropForeignKey('planet', foreignKey);
    await queryRunner.dropColumn('planet', 'galaxy_id');
  }
}
