export const CURATED_PATHS = {
  FETCH: {
    SUCCESS: 'FETCH_CURATED_SUCCESS'
  }
};

export const paths = [
  { id: 1, name: 'From 0 to Docker hero', author: 'Karol Sojko' },
  { id: 2, name: 'Backend to Frontend in 30 days', author: 'Jacek Lawniczak' },
  { id: 3, name: 'Game development for beginners', author: 'Jacek Lawniczak' }
];

export function fetchCuratedPaths() {
  return (dispatch) => dispatch({ type: CURATED_PATHS.FETCH.SUCCESS, paths });
}
