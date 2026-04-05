import descenteIcon from '@/assets/images/icones/descente.png';
import montagneIcon from '@/assets/images/icones/montagne.png';
import sprintIcon from '@/assets/images/icones/sprint.png';
import generalIcon from '@/assets/images/icones/general.png';

export const CATEGORIES = {
  GENERAL: {
    code: 'G',
    name: 'general'
  },
  MOUNTAIN: {
    code: 'M',
    name: 'mountain'
  },
  FLAT: {
    code: 'P',
    name: 'sprint'
  },
  DESCENT: {
    code: 'D',
    name: 'descent'
  }
} as const;

export const CATEGORY_LIST = [
  CATEGORIES.GENERAL,
  CATEGORIES.MOUNTAIN,
  CATEGORIES.FLAT,
  CATEGORIES.DESCENT
];

export const CATEGORY_NAMES = [
  CATEGORIES.GENERAL.name,
  CATEGORIES.MOUNTAIN.name,
  CATEGORIES.FLAT.name,
  CATEGORIES.DESCENT.name
];

export const getCategoryName = (code: string): string => {
  switch (code) {
    case CATEGORIES.GENERAL.code:
      return CATEGORIES.GENERAL.name;
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

export const getIconeFromCategory = (category: string): string => {
  switch (category) {
    case 'D':
      return descenteIcon;
    case 'M':
      return montagneIcon;
    case 'S':
      return sprintIcon;
    case 'G':
      return generalIcon;
    default:
      return generalIcon;
  }
};
