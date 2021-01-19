import { db, timestamp } from "../lib/firebase";
import faker from "faker";

const seedProjects = (num = 20) => {
  const projects = [];
  for (let i = 0; i < num; i++) {
    const project = {
      title: faker.company.companyName(),
      description: faker.lorem.paragraphs(3),
      image_url: faker.image.imageUrl(600),
      github_link: faker.internet.url(),
      website_link: faker.internet.url(),
      created_at: timestamp,
      updated_at: timestamp,
      labels: [],
      user: {
        id: "Zrdo8H8n8VdxDrU3vtTNYYnWzEm2",
        name: "John Doe",
        photo_url: "",
      },
    };
    projects.push(project);
  }

  projects.forEach((project) => {
    return db.collection("projects").add({ ...project });
  });
};

export const Seed = {
  seedProjects,
};
