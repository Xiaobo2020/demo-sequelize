import { Model, Optional } from "sequelize";

// ===== Organization =====
export interface OrganizationAttributes {
  id: number;
  name: string;
}

interface OrganizationCreationAttributes
  extends Optional<OrganizationAttributes, "id"> {}

export interface OrganizationInstance
  extends Model<OrganizationAttributes, OrganizationCreationAttributes> {}
