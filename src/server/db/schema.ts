//TODO: Seperate schema into folder and files
import { relations, sql } from "drizzle-orm";
import { UserPermissions } from "@/types/permissions"
import {
  boolean,
  date,
  index,
  integer,
  json,
  jsonb,
  pgTable,
  primaryKey,
  real,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { timestamps } from "@/lib/db";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

export const posts = pgTable(
  "post",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    createdById: varchar("createdById", { length: 255 })
      .notNull()
      .references(() => users.id),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
  },
  (example) => ({
    createdByIdIdx: index("createdById_idx").on(example.createdById),
    nameIndex: index("name_idx").on(example.name),
  })
);

export const users = pgTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
  permissions: json("permissions").$type<UserPermissions[]>().notNull().default(["none"]),
  country: text("country"),
  projectId: integer("project_id"),

});

export const usersRelations = relations(users, ({ many, one }) => ({
  accounts: many(accounts),
  project: one(projects, {
    fields: [users.projectId],
    references: [projects.id]
  })
}));

export const accounts = pgTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  })
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = pgTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  })
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  desc: text("description").notNull().default(""),
  challenge: text("challenge").notNull().default(""),
  approach: text("approach").notNull().default(""),
  progress: real("progress").default(0.0),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
  imageUrl: text("image").notNull().default("https://placehold.co/600x400"),
  startDate: date("date").notNull(),
  isPublic: boolean("is_public").notNull().default(false),
});

export const projectsRelations = relations(projects, ({ many }) => ({
  projectToGuides: many(projectToGuides),
  users: many(users),
  nodes: many(nodes),
}))
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  time: timestamp("date").notNull().default(sql`now()`),
  isVirtual: boolean("boolean").default(false),
  desc: text("description").notNull(),
  image: text("image").notNull().default("https://placehold.co/600x400"),
  isPublic: boolean("is_public").notNull().default(false),
  registrationLink: text("registration_link").notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
})

export const guides = pgTable("guides", {
  id: serial("id").primaryKey(),
  name: text("name"),
  embedId: text("embed_id"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
})


export const guidesRelations = relations(guides, ({ many }) => ({
  projects: many(projectToGuides),
  skills: many(skillToGuides)
}))

export const projectToGuides = pgTable("projectToGuides", {
  projectId: integer("project_id"),
  guideId: integer("guide_id")
}, (t) => ({
  pk: primaryKey(t.guideId, t.projectId)
}))

export const projectToGuidesRelations = relations(projectToGuides, ({ one }) => ({
  project: one(projects, {
    fields: [projectToGuides.projectId],
    references: [projects.id]
  }),
  guide: one(guides, {
    fields: [projectToGuides.guideId],
    references: [guides.id]
  }),
}))

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
  name: text("name").notNull()
})

export const skillToGuides = pgTable("skillToGuides", {
  skillId: integer("skillId"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
  guideId: integer("guide_id")

}, (t) => ({
  pk: primaryKey(t.guideId, t.skillId)
}))

export const skillToGuidesRelations = relations(skillToGuides, ({ one }) => ({
  skills: one(skills, {
    fields: [skillToGuides.skillId],
    references: [skills.id]
  }),
  guide: one(guides, {
    fields: [skillToGuides.guideId],
    references: [guides.id]
  }),
}))


export const nodes = pgTable("nodes", {
  id: text('id').primaryKey(),
  projectId: integer("project_id").notNull(),
  parentId: text("parent_id"),
  type: text("node_type").notNull().default("custom"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
  data: jsonb('data').notNull().$type<{
    name: string,
    assigne: string,
    assigneName: string,
    endDate: Date,
  }>(),
  position: jsonb('position').notNull().$type<{
    x: number,
    y: number
  }>(),
})

export const edges = pgTable("edges", {
  id: text("id").primaryKey(),
  source: text("source").references(() => nodes.id).notNull(),
  target: text("target").references(() => nodes.id).notNull(),
  projectId: integer("project_id").notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
  // Add more edge-specific fields if needed
});

export type Edge = typeof edges.$inferSelect;

export const nodeRelations = relations(nodes, ({ one }) => ({
  project: one(projects, {
    fields: [nodes.projectId],
    references: [projects.id]
  })
}))

export const edgesRelations = relations(edges, ({ one }) => ({
  task: one(projects, {
    fields: [edges.projectId],
    references: [projects.id]
  })
}))

export const updateTaskSchema = createSelectSchema(nodes, {
  id: z.string(),
  type: z.string().optional(),
  projectId: z.number().optional(),
  parentId: z.string().optional(),
  data: z.object({
    name: z.string(),
    assigne: z.string(),
    assigneName: z.string(),
    endDate: z.date(),
  }).optional(),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }).optional(),
}).omit(timestamps)
