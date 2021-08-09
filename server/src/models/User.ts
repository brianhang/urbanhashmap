import { Column, Model, Table } from "sequelize-typescript";

@Table
class User extends Model {
  @Column
  name!: string;

  @Column
  fbid!: string;
}

export default User;
