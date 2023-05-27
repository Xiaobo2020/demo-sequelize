import { DataTypes, ModelStatic } from "sequelize";

import sequelize from "../sequelize";
import { UserInstance } from "../types";

const User: ModelStatic<UserInstance> = sequelize.define<UserInstance>(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    display_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "user", timestamps: false }
);

export default User;
