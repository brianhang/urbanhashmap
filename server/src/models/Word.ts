import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

import User from './User';

@Table
class Word extends Model<{
  word: string,
  definition: string,
  creatorID: number,
  example?: string,
}> {
  @Column
  word!: string;

  @Column(DataType.TEXT)
  definition!: string;

  @ForeignKey(() => User)
  @Column
  creatorID!: number;

  @BelongsTo(() => User)
  creator!: User;

  @AllowNull
  @Column(DataType.TEXT)
  example?: string;
}

export default Word;
