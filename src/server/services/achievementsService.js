import achievementsModel from '../models/achievementsModel.js';
import STATUS_CODE from '../constants/statusCode.js';
import ApplicationError from '../common/applicationError.js';
import utils from '../utils/index.js';

export default {
  async get() {
    const allAchievements = await achievementsModel.get();
    const mainAchievements = allAchievements.filter(({ achievementsId }) => !achievementsId);

    const achievements = mainAchievements.map(achievement => {
      const subAchievements = allAchievements.filter(({ achievementsId }) => achievementsId === achievement.id);

      return {
        ...achievement,
        subAchievements,
      };
    });

    const statisticsItem = utils.generateStatisticsItems(allAchievements);
    achievements.push(...statisticsItem);

    return achievements;
  },
  async getById(id) {
    const achievement = await achievementsModel.getById(id);
    if (!achievement.length) {
      throw new ApplicationError(STATUS_CODE.NOT_FOUND, '항목을 찾을 수 없습니다.');
    }
    return achievement;
  },

  async create(data) {
    const { insertId } = await achievementsModel.create(data);

    const achievement = await achievementsModel.getById(insertId);
    return achievement;
  },

  async update(id, data) {
    await achievementsModel.update(id, data);
    const achievement = await achievementsModel.getById(id);
    return achievement;
  },

  async delete(id) {
    await achievementsModel.delete(id);
  },
};
