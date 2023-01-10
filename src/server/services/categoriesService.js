import STATUS_CODE from '../constants/statusCode.js';
import ApplicationError from '../common/applicationError.js';
import categoriesModel from '../models/categoriesModel.js';

export default {
  async get() {
    const allCategories = await categoriesModel.get();
    const mainCategories = allCategories.filter(({ sub }) => !sub);

    const categories = mainCategories.map(({ id, name, title }) => {
      const subCategories = allCategories
        .filter(({ categoryId, sub }) => sub && id === categoryId)
        .map(({ id, name, title }) => ({ id, name, title }));

      return {
        id,
        name,
        title,
        subCategories,
      };
    });
    return categories;
  },
  async getSubById(id) {
    const category = await categoriesModel.getSubById(id);
    if (!category.length) {
      throw new ApplicationError(STATUS_CODE.NOT_FOUND, '카테고리를 찾을 수 없습니다.');
    }
    return category;
  },
};
