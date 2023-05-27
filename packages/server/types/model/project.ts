import { Model, Optional } from "sequelize";

// ===== Project =====
export interface ProjectAttributes {
  id: number;
  name: string;
  organization_id: number;
}

interface ProjectCreationAttributes extends Optional<ProjectAttributes, "id"> {}

export interface ProjectInstance
  extends Model<ProjectAttributes, ProjectCreationAttributes> {}
