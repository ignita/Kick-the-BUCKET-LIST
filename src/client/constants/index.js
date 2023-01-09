const CATEGORY_ICON = {
  trip: 'bx bxs-map-alt',
  food: 'bx bxs-bowl-rice',
  'rest-etc': 'bx bxs-bed',
  making: 'bx bxs-wrench',
  computer: 'bx bx-desktop',
  art: 'bx bxs-palette',
  community: 'bx bxs-group',
  'hobby-etc': 'bx bxs-joystick',
  survival: 'bx bxs-compass',
  outdoor: 'bx bx-run',
  indoor: 'bx bx-dumbbell',
  'health-etc': 'bx bxs-heart',
  education: 'bx bxs-graduation',
  certificate: 'bx bxs-certification',
  language: 'bx bxs-book',
  work: 'bx bxs-briefcase-alt-2',
  possession: 'bx bxs-box',
};

const FILTER_TYPE = {
  ALL: 0,
  COMPLETED: 1,
  INCOMPLETED: 2,
  FAILURE: 3,
};

const FILTER_ITEMS = [
  {
    type: FILTER_TYPE.ALL,
    title: '전체',
  },
  {
    type: FILTER_TYPE.COMPLETED,
    title: '달성',
  },
  {
    type: FILTER_TYPE.INCOMPLETED,
    title: '미달성',
  },
  {
    type: FILTER_TYPE.FAILURE,
    title: '실패',
  },
];
export { CATEGORY_ICON, FILTER_TYPE, FILTER_ITEMS };
