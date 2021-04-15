import { configureStore } from '@reduxjs/toolkit';
import dataReducer from '../redux/dataSlice';

export default configureStore({
  reducer: {
    data: dataReducer,
  },
});
