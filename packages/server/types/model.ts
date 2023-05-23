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

// ===== Project =====
export interface ProjectAttributes {
  id: number;
  name: string;
  organization_id: number;
}

interface ProjectCreationAttributes extends Optional<ProjectAttributes, "id"> {}

export interface ProjectInstance
  extends Model<ProjectAttributes, ProjectCreationAttributes> {}
