import { Model, Optional } from "sequelize";

// ===== User =====
export interface UserAttributes {
  id: number;
  username: string;
  display_name: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes> {}
