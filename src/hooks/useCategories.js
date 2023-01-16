import { productService } from "@/services/product";
import { useQuery } from "./useQuery";

export const useCategories = () => {
  const { data: { data = [] } = {}, loading } = useQuery({
    queryKey: "categories",
    queryFn: () => productService.getCategories(),
    cacheTime: 3600_000,
  });
  return { data, loading };
};

export const useCategory = (id) => {
  // const { data: { data: category } = {} } = useQuery({
  //     queryFn: () => productService.getCategoryDetail(id),
  //     enabled: !!id,
  //     queryKey: `category-${id}`,
  //     storeDriver: 'sessionStorage',
  //     cacheTime: Infinity
  // })

  // return category

  const { data } = useCategories();
  return data.find((e) => e.id === id);
};
