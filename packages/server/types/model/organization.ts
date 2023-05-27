import { HasMany, Model, ModelStatic, Optional } from "sequelize";
import { ProjectInstance } from "./project";

// ===== Organization =====
export interface OrganizationAttributes {
  id: number;
  name: string;
}

interface OrganizationCreationAttributes
  extends Optional<OrganizationAttributes, "id"> {}

export interface OrganizationInstance
  extends Model<OrganizationAttributes, OrganizationCreationAttributes> {}

export type OrganizationModel = ModelStatic<OrganizationInstance> & {
  Project: HasMany<OrganizationInstance, ProjectInstance>;
};
