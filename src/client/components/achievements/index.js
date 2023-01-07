import AchievementsDashboard from './Dashboard';
import AchievementsList from './List';

export default class Achievements {
  constructor({ container }) {
    this.container = container;
    this.target = document.createElement('main');
    this.target.classList = 'achievements-wrapper';
    this.container.appendChild(this.target);

    this.state = {
      categories: [
        {
          id: 1,
          name: 'rest',
          title: '휴식',
          subCategories: [
            {
              id: 1,
              name: 'trip',
              title: '여행',
            },
            {
              id: 2,
              name: 'food',
              title: '음식',
            },
            {
              id: 3,
              name: 'rest-etc',
              title: '기타',
            },
          ],
        },
        {
          id: 2,
          name: 'hobby',
          title: '취미',
          subCategories: [
            {
              id: 4,
              name: 'making',
              title: '제작',
            },
            {
              id: 5,
              name: 'computer',
              title: '컴퓨터',
            },
            {
              id: 6,
              name: 'art',
              title: '예술',
            },
            {
              id: 7,
              name: 'community',
              title: '커뮤니티',
            },
            {
              id: 8,
              name: 'hobby-etc',
              title: '기타',
            },
          ],
        },
        {
          id: 3,
          name: 'health',
          title: '건강',
          subCategories: [
            {
              id: 9,
              name: 'survival',
              title: '생존',
            },
            {
              id: 10,
              name: 'outdoor',
              title: '야외운동',
            },
            {
              id: 11,
              name: 'indoor',
              title: '실내운동',
            },
            {
              id: 12,
              name: 'health-etc',
              title: '기타',
            },
          ],
        },
        {
          id: 4,
          name: 'learn',
          title: '배움',
          subCategories: [
            {
              id: 13,
              name: 'education',
              title: '고등 교육',
            },
            {
              id: 14,
              name: 'certificate',
              title: '자격',
            },
            {
              id: 15,
              name: 'language',
              title: '언어',
            },
          ],
        },
        {
          id: 5,
          name: 'money',
          title: '돈',
          subCategories: [
            {
              id: 16,
              name: 'work',
              title: '직업',
            },
            {
              id: 17,
              name: 'possession',
              title: '소유',
            },
          ],
        },
      ],
      achievements: [
        {
          id: 1,
          subCategoryId: 1,
          achievementsId: null,
          title: 'Call me Ishmael',
          description: '바다에서 고래 만나기',
          completed: 0,
          completedDate: null,
          review: null,
          images: null,
          isFailure: 0,
          subAchievements: [],
        },
        {
          id: 2,
          subCategoryId: 1,
          achievementsId: null,
          title: '걸어서 하늘까지',
          description: '높이 올라간다.',
          completed: 0,
          completedDate: null,
          review: null,
          images: null,
          isFailure: 0,
          subAchievements: [
            {
              id: 1,
              subCategoryId: null,
              achievementsId: 2,
              title: '민족의 영산',
              description: '해발 1,000m 이상인 땅 밟기.',
              completed: 0,
              completedDate: null,
              review: null,
              images: null,
              isFailure: 0,
            },
            {
              id: 2,
              subCategoryId: null,
              achievementsId: 2,
              title: '로밍이 필요해',
              description: '해발 5,000m 이상인 땅 밟기.',
              completed: 0,
              completedDate: null,
              review: null,
              images: null,
              isFailure: 0,
            },
            {
              id: 3,
              subCategoryId: null,
              achievementsId: 2,
              title: '신들의 땅',
              description: '히말라야 트레킹.',
              completed: 0,
              completedDate: null,
              review: null,
              images: null,
              isFailure: 0,
            },
            {
              id: 4,
              subCategoryId: null,
              achievementsId: 2,
              title: '순순히 어두운 밤을 받아들이지 마오',
              description: '우주 여행.',
              completed: 0,
              completedDate: null,
              review: null,
              images: null,
              isFailure: 0,
            },
          ],
        },
        {
          id: 3,
          subCategoryId: 1,
          achievementsId: null,
          title: '팔도유람',
          description: '국내 여행하기',
          completed: 0,
          completedDate: null,
          review: null,
          images: null,
          isFailure: 0,
          subAchievements: [],
        },
        {
          id: 4,
          subCategoryId: 2,
          achievementsId: null,
          title: '탁!',
          description: '한 손으로 계란 깨기',
          completed: 0,
          completedDate: null,
          review: null,
          images: null,
          isFailure: 0,
          subAchievements: [],
        },
        {
          id: 5,
          subCategoryId: 2,
          achievementsId: null,
          title: '흑역사 생성',
          description: '기억 잃을 때까지 술 마시기',
          completed: 0,
          completedDate: null,
          review: null,
          images: null,
          isFailure: 0,
          subAchievements: [],
        },
        {
          id: 6,
          subCategoryId: 2,
          achievementsId: null,
          title: '줘봐 따줄게.',
          description: '병따개 없이 맥주병 따는 법 터득하기.',
          completed: 0,
          completedDate: null,
          review: null,
          images: null,
          isFailure: 0,
          subAchievements: [],
        },
        {
          id: 7,
          subCategoryId: 2,
          achievementsId: null,
          title: '빵지순례 #1',
          description: '전국 각지의 이름난 빵집 방문하기.',
          completed: 0,
          completedDate: null,
          review: null,
          images: null,
          isFailure: 0,
          subAchievements: [],
        },
        {
          id: 8,
          subCategoryId: 2,
          achievementsId: null,
          title: '빵지순례 #2',
          description: '제과 명장의 빵집 방문하기.',
          completed: 0,
          completedDate: null,
          review: null,
          images: null,
          isFailure: 0,
          subAchievements: [],
        },
      ],
    };
    this.render();
  }

  render() {
    new AchievementsDashboard({ container: this.target });
    new AchievementsList({ container: this.target, initState: this.state });
  }
}
