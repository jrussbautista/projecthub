import { db } from "lib/firebase";
import { Project } from "types/Project";
import { HomeData } from "types/HomeData";

const PROJECTS_COLLECTION = "projects";
const FEATURED_PROJECTS_LIMIT = 8;
const LATEST_PROJECTS_LIMIT = 20;

const getProjectsCollection = (project: any) => {
  return { ...(project.data() as Project), id: project.id };
};

const getHomeData = async (): Promise<HomeData> => {
  const projectsRef = db.collection(PROJECTS_COLLECTION);

  const getFeaturedProjects = await projectsRef
    .limit(FEATURED_PROJECTS_LIMIT)
    .orderBy("favorites_count", "desc")
    .get();
  const getLatestProjects = await projectsRef
    .limit(LATEST_PROJECTS_LIMIT)
    .orderBy("created_at", "desc")
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
