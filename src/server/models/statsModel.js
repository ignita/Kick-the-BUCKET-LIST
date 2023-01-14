import pool from '../config/db.js';

export default {
  async getTrending() {
    const [trending] = await pool.execute(
      `SELECT thisYear
            , (trending.thisYear - trending.lastYear) / trending.lastYear * 100 as 'thisYearTrending'
            , trending.thisYear - trending.lastYear as gapThisYear
            , lastYear
            , (trending.lastYear - trending.yearBeforeLast) / trending.yearBeforeLast * 100 as 'lastYearTrending'
            , trending.lastYear - trending.yearBeforeLast as gapLastYear
            , yearBeforeLast
            , (trending.yearBeforeLast - trending.lastThreeYears) / trending.lastThreeYears * 100 as 'yearBeforeLastTrending'
            , trending.yearBeforeLast - trending.lastThreeYears as gapYearBeforeLast
            , lastThreeYears
            , (trending.lastThreeYears - trending.beforeLastThreeYears) / trending.beforeLastThreeYears * 100 as 'lastThreeYearsTrending'
            , trending.lastThreeYears - trending.beforeLastThreeYears as gapLastThreeYears
            , beforeLastThreeYears
            , (SELECT count(id) 
                 FROM (SELECT id, title
                         FROM achievements 
                        WHERE completed = 0
                          AND id NOT IN (SELECT achievements_id 
                                           FROM sub_achievements
                                          WHERE completed = 0)
                        UNION 
                       SELECT id, title
                         FROM sub_achievements 
                        WHERE completed = 0) as incompleted) as incompleted
            , (SELECT count(id) 
                 FROM (SELECT id, title
                         FROM achievements 
                        WHERE id NOT IN (SELECT achievements_id 
                                           FROM sub_achievements)
                        UNION 
                       SELECT id, title
                         FROM sub_achievements) as total ) as total
           , completed
         FROM (SELECT sum(if(completed.completedYear = YEAR(CURDATE()), 1, 0)) as 'thisYear'
                    , sum(if(completed.completedYear = YEAR(CURDATE()) - 1, 1, 0)) as 'lastYear'
                    , sum(if(completed.completedYear = YEAR(CURDATE()) - 2, 1, 0)) as 'yearBeforeLast'
                    , sum(if(completed.completedYear BETWEEN YEAR(CURDATE()) - 3 AND YEAR(CURDATE()), 1, 0)) as 'lastThreeYears'
                    , sum(if(completed.completedYear BETWEEN YEAR(CURDATE()) - 6 AND YEAR(CURDATE()) - 4, 1, 0)) as 'beforeLastThreeYears'
                    , count(completed.id) as completed
                 FROM (SELECT id, title
                            , ifnull(YEAR(completed_date), completed_year) as completedYear
                         FROM achievements 
                        WHERE completed = 1
                          AND id NOT IN (SELECT achievements_id 
                                           FROM sub_achievements
                                          WHERE completed = 1)
                        UNION 
                       SELECT id, title
                            , ifnull(YEAR(completed_date), completed_year) as completedYear
                         FROM sub_achievements WHERE completed = 1) as completed
                ) as trending;
      `,
    );
    return trending;
  },
  async getRatioByCategories(type) {
    const [ratioByCategories] = await pool.execute(
      `
      SELECT t1.cnt
           , t1.sub_category_id as subCategoryId
           , t1.name
           , CASE WHEN t1.title = '기타' THEN CONCAT('기타 (', (SELECT title FROM category WHERE id = t1.category_id), ')')
                  ELSE t1.title
             END as title
           , ROUND((t1.cnt / SUM(t1.cnt) OVER ()) * 100, 2) as rat
        FROM (SELECT count(total.id) as cnt
                   , total.sub_category_id
                   , sub_category.name
                   , sub_category.title     
                   , sub_category.category_id 
                FROM (SELECT id
                           , title
                           , sub_category_id
                        FROM achievements
                       WHERE id NOT IN (SELECT achievements_id 
                                          FROM sub_achievements
                                          ${type === 'total' ? '' : `WHERE completed = ${type}`})
                      ${type === 'total' ? '' : `AND achievements.completed = ${type}`}
                       UNION 
                      SELECT sub_achievements.id
                           , sub_achievements.title
                           , achievements.sub_category_id as sub_category_id
                        FROM sub_achievements
                       INNER JOIN achievements 
                          ON achievements.id = sub_achievements.achievements_id
                      ${type === 'total' ? '' : `WHERE achievements.completed = ${type}`}
                      ) as total
               INNER JOIN sub_category 
                  ON total.sub_category_id = sub_category.id
               GROUP BY total.sub_category_id) t1
    ORDER BY t1.cnt desc
      `,
    );
    return ratioByCategories;
  },

  async getCompletedByYears(start, end) {
    const [completedByYears] = await pool.execute(`
    SELECT count(t1.id) as cnt
         , t1.year
      FROM (SELECT id, title, ifnull(YEAR(completed_date), completed_year) as year
              FROM achievements
		         WHERE completed = 1
		           AND id not in (SELECT achievements_id 
							                  FROM sub_achievements
						                   WHERE completed = 1)
             UNION all
            SELECT id, title, ifnull(YEAR(completed_date), completed_year) as year
              FROM sub_achievements
             WHERE completed = 1) t1
    WHERE t1.year between '${start}' and '${end} '
    GROUP BY t1.year
    ORDER BY t1.year
  `);
    return completedByYears;
  },
};
