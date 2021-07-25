import axios from 'axios';
import { BASE_URL } from '@env';
import { useGetSWR } from '#hooks';

class CategoryService {
  static async GET_getCategory() {
    const { data, isLoading, error, mutate } = await useGetSWR(`category`);
    if (!error) {
      return data.item;
    } else {
      throw new Error('failed to retrive GET CATEGORY!');
    }
  }
}

export default CategoryService;
