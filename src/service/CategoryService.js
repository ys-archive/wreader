import { useGetSWR } from '#hooks';

class CategoryService {
  static async useGET_getCategory() {
    const { data, isLoading, error, mutate } = await useGetSWR(`category`);
    return { item: data.item, isLoading, error, mutate };
  }
}

export default CategoryService;
