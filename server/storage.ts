
import { eq } from "drizzle-orm";
import { db } from "./db";
import type { Project, Skill, Message } from "../shared/schema";

class Storage {
  async getProjects(): Promise<Project[]> {
    return await db.query.projects.findMany();
  }

  async getProject(id: number): Promise<Project | undefined> {
    return await db.query.projects.findFirst({
      where: eq(db.schema.projects.id, id),
    });
  }

  async getSkills(): Promise<Skill[]> {
    return await db.query.skills.findMany();
  }

  async createMessage(message: Message): Promise<Message> {
    const [created] = await db.insert(db.schema.messages)
      .values(message)
      .returning();
    return created;
  }
}

export const storage = new Storage();
