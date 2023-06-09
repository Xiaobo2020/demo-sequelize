import { DataTypes } from "sequelize";

import sequelize from "../sequelize";
import type { ProjectInstance, ProjectModel } from "../types";
import Organization from "./organization";

// @ts-ignore
const Project: ProjectModel = sequelize.define<ProjectInstance>(
  "Project",
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
    organization_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { tableName: "project", timestamps: false }
);

Project.Organization = Project.belongsTo(Organization, {
  foreignKey: "organization_id",
  as: "organization",
});

Organization.Project = Organization.hasMany(Project, {
  sourceKey: "id",
  foreignKey: "organization_id",
  as: "projects",
});

export default Project;
