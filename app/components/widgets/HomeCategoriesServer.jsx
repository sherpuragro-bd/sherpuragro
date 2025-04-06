import { getAllCategories } from "@/actions/admin/Category";
import HomeCategories from "./HomeCategories";

const HomeCategoriesServer = async () => {
  const categories = await getAllCategories();

  return (
    <>
      <HomeCategories data={categories} />
    </>
  );
};

export default HomeCategoriesServer;
