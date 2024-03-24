import { createReducer, on } from '@ngrx/store';
import { MedicalStoreRegistrationState } from './medReg.state';
import * as MedicalStoreRegistrationActions from './medReg.actions';


export const initialState: MedicalStoreRegistrationState = {
  page1FormData: null,
};

export const medicalStoreRegistrationReducer = createReducer(
  initialState,
  on(MedicalStoreRegistrationActions.setPage1FormData, (state, { page1FormData }) => {
    return { ...state, page1FormData };
  }),
  on(MedicalStoreRegistrationActions.clearMedicalStoreRegistrationData, (state) => {
    return { ...state, page1FormData: null };
  })
);
