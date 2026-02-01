export const CATEGORIES = {
  MOUNTAIN: {
    code: 'M',
    name: 'Montagne'
  },
  FLAT: {
    code: 'P',
    name: 'Plat'
  },
  DESCENT: {
    code: 'D',
    name: 'Descente'
  }
} as const;

export const CATEGORY_LIST = [
  CATEGORIES.MOUNTAIN,
  CATEGORIES.FLAT,
  CATEGORIES.DESCENT
];

export const CATEGORY_NAMES = [
  CATEGORIES.MOUNTAIN.name,
  CATEGORIES.FLAT.name,
  CATEGORIES.DESCENT.name
];

export const getCategoryName = (code: string): string => {
  switch(code) {
    case CATEGORIES.MOUNTAIN.code:
      return CATEGORIES.MOUNTAIN.name;
    case CATEGORIES.FLAT.code:
      return CATEGORIES.FLAT.name;
    case CATEGORIES.DESCENT.code:
      return CATEGORIES.DESCENT.name;
    default:
      return code;
  }
};
