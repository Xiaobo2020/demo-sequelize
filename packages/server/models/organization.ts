import { DataTypes } from "sequelize";

import sequelize from "../sequelize";
import type { OrganizationInstance, OrganizationModel } from "../types";

// @ts-ignore
const Organization: OrganizationModel = sequelize.define<OrganizationInstance>(
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
