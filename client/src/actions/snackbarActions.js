import { CLOSE_SNACKBAR } from './types';

export const closeSnackbar = () => dispatch => {
   dispatch({type: CLOSE_SNACKBAR});
}
