import { db } from "lib/firebase";
import { Category } from "interfaces/Category";

const CATEGORIES_COLLECTION = "categories";

const getCategories = async (): Promise<Category[]> => {
  const categoriesRef = db.collection(CATEGORIES_COLLECTION);
  const getCategoriesRef = await categoriesRef.get();

  const categories = getCategoriesRef.docs.map((category) => {
    return {
      ...(category.data() as Category),
      id: category.id,
    };
  });

  return categories;
};

export const CategoryService = {
  getCategories,
};
