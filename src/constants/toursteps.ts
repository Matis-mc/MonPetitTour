export const TOUR_STEPS = {
  UPLOAD_GPX: {
    route: 'upload'
  },
  MAP: {
    route: 'map'
  },
  SEGMENTS_RANKING: {
    route: 'segments'
  },
  CONFIRMATION_TOUR: {
    route: 'confirmation'
  }
} as const;

export const TOUR_STEPS_LIST = [
    TOUR_STEPS.UPLOAD_GPX,
    TOUR_STEPS.MAP,
    TOUR_STEPS.SEGMENTS_RANKING,   
    TOUR_STEPS.CONFIRMATION_TOUR
];

export const TOUR_STEPS_ROUTES = [
  TOUR_STEPS.UPLOAD_GPX.route,
  TOUR_STEPS.MAP.route,
  TOUR_STEPS.SEGMENTS_RANKING.route,
  TOUR_STEPS.CONFIRMATION_TOUR.route
];
