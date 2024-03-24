import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MedicalStoreRegistrationState } from './medReg.state';

export const selectMedicalStoreRegistrationState = createFeatureSelector<MedicalStoreRegistrationState>(
  'medicalStoreRegistration'
);

export const selectPage1FormData = createSelector(
  selectMedicalStoreRegistrationState,
  (state) => state.page1FormData
);
