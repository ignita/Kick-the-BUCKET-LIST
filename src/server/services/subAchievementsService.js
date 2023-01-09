const subAchievementsModel = require('../models/subAchievementsModel');
const STATUS_CODE = require('../constants/statusCode');
const ApplicationError = require('../common/applicationError');

module.exports = {
  async getById(id) {
    const subAchievement = await subAchievementsModel.getById(id);
    if (!subAchievement.length) {
      throw new ApplicationError(STATUS_CODE.NOT_FOUND, '항목을 찾을 수 없습니다.');
    }
    return subAchievement;
  },

  async create(data) {
    const { insertId } = await subAchievementsModel.create(data);

    const subAchievement = await subAchievementsModel.getById(insertId);
    return subAchievement;
  },

  async update(id, data) {
    await subAchievementsModel.update(id, data);
    const achievement = await subAchievementsModel.getById(id);
    return achievement;
  },

  async delete(id) {
    await subAchievementsModel.delete(id);
  },
};
