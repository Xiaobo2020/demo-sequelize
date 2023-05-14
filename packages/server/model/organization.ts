import { DataTypes, HasMany, ModelStatic } from "sequelize";

import sequelize from "../sequelize";
import { OrganizationInstance, ProjectInstance } from "../type";

// @ts-ignore
const Organization: ModelStatic<OrganizationInstance> & {
  Project: HasMany<OrganizationInstance, ProjectInstance>;
} = sequelize.define<OrganizationInstance>(
  "Organization",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "organization", timestamps: false }
);

export default Organization;
