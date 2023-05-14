# Sequelize

## 安装

```bash
npm install sequelize mysql2
```

## 创建 Sequelize 实例

```typescript
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("test_db", "root", "", {
  host: "127.0.0.1",
  dialect: "mysql",
});
```

## 创建 Model

```typescript
const Organization = sequelize.define(
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
```

## CRUD

### 插入数据

新增一条记录

```typescript
const flight = Organization.build({
  name: "flight",
});
await flight.save();
```

```typescript
await Organization.create({
  name: "flight",
});
```

一次性新增多条记录

```typescript
const organizations = await Organization.bulkCreate([
  { name: "flight" },
  { name: "hotel" },
]);
```

### 删除数据

删除一条记录

```typescript
const flight = await Organization.findOne({
  where: {
    name: "flight",
  },
});
await flight.destroy();
```

删除对应条件的记录

```typescript
await Organization.destroy({
  where: {
    name: "flight",
  },
});
```

删除所有记录

```typescript
await Organization.destroy({
  truncate: true,
});
```

### 修改数据

更新一条记录中的一个字段

利用 `save` 进行更新:

```typescript
const flight = await Organization.findOne({
  where: {
    name: "flight",
  },
});

flight.set({
  name: "Flight",
});
// or
flight.name = "Flight";

// 保存所有改动
await flight.save();
```

利用 `update` 进行更新:

```typescript
const flight = await Organization.findOne({
  where: {
    name: "flight",
  },
});
// 更新指定字段
await flight.update({
  name: "Flight",
});
```

利用 `update` 进行批量更新:

```typescript
await Organization.update(
  {
    name: "Flight",
  },
  {
    where: {
      name: "flight",
    },
  }
);
```

### 查询数据

[Model Query Finders](https://sequelize.org/docs/v6/core-concepts/model-querying-finders/) 支持的查询相关函数.

- `findAll`
- `findByPK`
- `findOne`
- `findOrBuild`
- `findOrCreate`
- ...

#### Attributes

```typescript
await Model.findAll({
  attributes: ["foo", "bar"],
});

// SELECT foo, bar FROM ...
```

重命名

```typescript
await Model.findAll({
  attributes: ["foo", ["bar", "baz"], "qux"],
});

// SELECT foo, bar AS baz, qux FROM ...
```

支持函数

```typescript
await Model.findAll({
  attributes: [
    "foo",
    [sequelize.fn("COUNT", sequelize.col("hats")), "n_hats"],
    "bar",
  ],
});

// SELECT foo, COUNT(hats) AS n_hats, bar FROM ...
```

#### Where

基本用法

```typescript
await Organization.findAll({
  where: {
    name: "flight",
  },
});
// SELECT * FROM organization WHERE name = "flight";
```

```typescript
await Organization.findAll({
  where: {
    name: {
      [Op.eq]: "flight",
    },
  },
});
```

[Operator](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#operators)

```typescript
const { Op } = require("sequelize");
Post.findAll({
  where: {
    [Op.and]: [{ a: 5 }, { b: 6 }],            // (a = 5) AND (b = 6)
    [Op.or]: [{ a: 5 }, { b: 6 }],             // (a = 5) OR (b = 6)
    someAttribute: {
      // Basics
      [Op.eq]: 3,                              // = 3
      [Op.ne]: 20,                             // != 20
      [Op.is]: null,                           // IS NULL
      [Op.not]: true,                          // IS NOT TRUE
      [Op.or]: [5, 6],                         // (someAttribute = 5) OR (someAttribute = 6)

      // Using dialect specific column identifiers (PG in the following example):
      [Op.col]: 'user.organization_id',        // = "user"."organization_id"

      // Number comparisons
      [Op.gt]: 6,                              // > 6
      [Op.gte]: 6,                             // >= 6
      [Op.lt]: 10,                             // < 10
      [Op.lte]: 10,                            // <= 10
      [Op.between]: [6, 10],                   // BETWEEN 6 AND 10
      [Op.notBetween]: [11, 15],               // NOT BETWEEN 11 AND 15

      // Other operators

      [Op.all]: sequelize.literal('SELECT 1'), // > ALL (SELECT 1)

      [Op.in]: [1, 2],                         // IN [1, 2]
      [Op.notIn]: [1, 2],                      // NOT IN [1, 2]

      [Op.like]: '%hat',                       // LIKE '%hat'
      [Op.notLike]: '%hat',                    // NOT LIKE '%hat'
      [Op.startsWith]: 'hat',                  // LIKE 'hat%'
      [Op.endsWith]: 'hat',                    // LIKE '%hat'
      [Op.substring]: 'hat',                   // LIKE '%hat%'
      [Op.iLike]: '%hat',                      // ILIKE '%hat' (case insensitive) (PG only)
      [Op.notILike]: '%hat',                   // NOT ILIKE '%hat'  (PG only)
      [Op.regexp]: '^[h|a|t]',                 // REGEXP/~ '^[h|a|t]' (MySQL/PG only)
      [Op.notRegexp]: '^[h|a|t]',              // NOT REGEXP/!~ '^[h|a|t]' (MySQL/PG only)
      [Op.iRegexp]: '^[h|a|t]',                // ~* '^[h|a|t]' (PG only)
      [Op.notIRegexp]: '^[h|a|t]',             // !~* '^[h|a|t]' (PG only)

      [Op.any]: [2, 3],                        // ANY (ARRAY[2, 3]::INTEGER[]) (PG only)
      [Op.match]: Sequelize.fn('to_tsquery', 'fat & rat') // match text search for strings 'fat' and 'rat' (PG only)

      // In Postgres, Op.like/Op.iLike/Op.notLike can be combined to Op.any:
      [Op.like]: { [Op.any]: ['cat', 'hat'] }  // LIKE ANY (ARRAY['cat', 'hat'])

      // There are more postgres-only range operators, see below
    }
  }
});
```

支持函数

```typescript
Post.findAll({
  where: sequelize.where(
    sequelize.fn("char_length", sequelize.col("content")),
    7
  ),
});

// SELECT ... FROM "posts" AS "post" WHERE char_length("content") = 7
```

[Ordering](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#ordering)

```typescript
Subtask.findAll({
  order: [
    // Will escape title and validate DESC against a list of valid direction parameters
    ["title", "DESC"],

    // Will order by max(age)
    sequelize.fn("max", sequelize.col("age")),

    // Will order by max(age) DESC
    [sequelize.fn("max", sequelize.col("age")), "DESC"],

    // Will order by  otherfunction(`col1`, 12, 'lalala') DESC
    [
      sequelize.fn("otherfunction", sequelize.col("col1"), 12, "lalala"),
      "DESC",
    ],

    // Will order an associated model's createdAt using the model name as the association's name.
    [Task, "createdAt", "DESC"],

    // Will order through an associated model's createdAt using the model names as the associations' names.
    [Task, Project, "createdAt", "DESC"],

    // Will order by an associated model's createdAt using the name of the association.
    ["Task", "createdAt", "DESC"],

    // Will order by a nested associated model's createdAt using the names of the associations.
    ["Task", "Project", "createdAt", "DESC"],

    // Will order by an associated model's createdAt using an association object. (preferred method)
    [Subtask.associations.Task, "createdAt", "DESC"],

    // Will order by a nested associated model's createdAt using association objects. (preferred method)
    [Subtask.associations.Task, Task.associations.Project, "createdAt", "DESC"],

    // Will order by an associated model's createdAt using a simple association object.
    [{ model: Task, as: "Task" }, "createdAt", "DESC"],

    // Will order by a nested associated model's createdAt simple association objects.
    [
      { model: Task, as: "Task" },
      { model: Project, as: "Project" },
      "createdAt",
      "DESC",
    ],
  ],

  // Will order by max age descending
  order: sequelize.literal("max(age) DESC"),

  // Will order by max age ascending assuming ascending is the default order when direction is omitted
  order: sequelize.fn("max", sequelize.col("age")),

  // Will order by age ascending assuming ascending is the default order when direction is omitted
  order: sequelize.col("age"),

  // Will order randomly based on the dialect (instead of fn('RAND') or fn('RANDOM'))
  order: sequelize.random(),
});

Foo.findOne({
  order: [
    // will return `name`
    ["name"],
    // will return `username` DESC
    ["username", "DESC"],
    // will return max(`age`)
    sequelize.fn("max", sequelize.col("age")),
    // will return max(`age`) DESC
    [sequelize.fn("max", sequelize.col("age")), "DESC"],
    // will return otherfunction(`col1`, 12, 'lalala') DESC
    [
      sequelize.fn("otherfunction", sequelize.col("col1"), 12, "lalala"),
      "DESC",
    ],
    // will return otherfunction(awesomefunction(`col`)) DESC, This nesting is potentially infinite!
    [
      sequelize.fn(
        "otherfunction",
        sequelize.fn("awesomefunction", sequelize.col("col"))
      ),
      "DESC",
    ],
  ],
});
```

[Grouping](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#grouping)

```typescript
Project.findAll({ group: "name" });
// yields 'GROUP BY name'
```

[Limits And Pagination](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#limits-and-pagination)

```typescript
// Fetch 10 instances/rows
Project.findAll({ limit: 10 });

// Skip 8 instances/rows
Project.findAll({ offset: 8 });

// Skip 5 instances and fetch the 5 after that
Project.findAll({ offset: 5, limit: 5 });
```

工具函数

[Utility Methods](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#utility-methods)

- `count`
- `max` & `min` & `sum`
- `increment` & `decrement`

## 关联关系 [Associations](https://sequelize.org/docs/v6/core-concepts/assocs/)

- 1:1
- 1:n
- m:n

函数

- `hasOne`
- `belongsTo`
- `hasMany`
- `belongsToMany`
