import { Column, HasMany, Model, Table } from 'sequelize-typescript';

import Word from './Word';

@Table
class User extends Model<{
  name: string,
  fbid: string,
}> {
  @Column
  name!: string;

  @Column
  fbid!: string;

  @HasMany(() => Word)
  words!: Word[];
}

export default User;
