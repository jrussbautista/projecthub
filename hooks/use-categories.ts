import { useState, useEffect } from "react";
import { CategoryService } from "services/category-service";
import { Status } from "interfaces/Status";
import { Category } from "interfaces/Category";

const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setStatus("idle");
        const results = await CategoryService.getCategories();
        setCategories(results);
        setStatus("success");
      } catch (error) {
        setStatus("error");
      }
    };
    fetchCategories();
  }, []);

  return {
    status,
    categories,
  };
};

export default useCategories;
