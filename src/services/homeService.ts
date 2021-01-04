import { db } from "lib/firebase";
import { Project } from "types/Project";
import { HomeData } from "types/HomeData";

const PROJECTS_COLLECTION = "projects";
const FEATURED_PROJECTS_LIMIT = 8;
const LATEST_PROJECTS_LIMIT = 20;

const getProjectsCollection = (project: any) => {
  const {
    title,
    description,
    image_url,
    github_link,
    website_link,
    labels,
    updated_at,
    created_at,
  } = project.data() as Project;

  return {
    id: project.id,
    labels,
    title,
    description,
    image_url,
    github_link,
    website_link,
    updated_at,
    created_at,
  };
};

const getHomeData = async (): Promise<HomeData> => {
  const projectsRef = db.collection(PROJECTS_COLLECTION);

  const getFeaturedProjects = await projectsRef
    .limit(FEATURED_PROJECTS_LIMIT)
    .get();
  const getLatestProjects = await projectsRef
    .limit(LATEST_PROJECTS_LIMIT)
    .get();

  const latestProjects = getLatestProjects.docs.map((project) =>
    getProjectsCollection(project)
  );
  const featuredProjects = getFeaturedProjects.docs.map((project) =>
    getProjectsCollection(project)
  );

  return {
    featuredProjects,
    latestProjects,
  };
};

export const HomeService = {
  getHomeData,
};
