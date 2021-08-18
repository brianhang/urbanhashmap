import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';

import User from './User';
import Word from './Word';

@Table
class UserWordUpvote extends Model<{
  userID: number,
  wordID: number,
}> {
  @ForeignKey(() => User)
  @Column
  userID!: number;

  @ForeignKey(() => Word)
  @Column
  wordID!: number;

  @BelongsTo(() => User)
  creator!: User;

  @BelongsTo(() => Word)
  word!: Word;
}

export default UserWordUpvote;
