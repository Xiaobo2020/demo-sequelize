import { BelongsTo, Model, ModelStatic, Optional } from "sequelize";
import { OrganizationInstance } from "./organization";

// ===== Project =====
export interface ProjectAttributes {
  id: number;
  name: string;
  organization_id: number;
}

interface ProjectCreationAttributes extends Optional<ProjectAttributes, "id"> {}

export interface ProjectInstance
  extends Model<ProjectAttributes, ProjectCreationAttributes> {}

export type ProjectModel = ModelStatic<ProjectInstance> & {
  Organization: BelongsTo<ProjectInstance, OrganizationInstance>;
};
