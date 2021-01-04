import { useState, useEffect } from "react";
import { ProjectService } from "services/projectService";
import { Project } from "types/Project";

const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProjects = async () => {
      try {
        setLoading(true);
        const results = await ProjectService.getProjects();
        setProjects(results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getProjects();
  }, []);

  return {
    loading,
    error,
    projects,
  };
};

export default useProjects;
