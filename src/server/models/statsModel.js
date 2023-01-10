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
};
