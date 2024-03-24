// src/app/store/medical-store-registration.actions.ts
import { createAction, props } from '@ngrx/store';
import { Page1FormData } from './medReg.state';

export const setPage1FormData = createAction(
  '[Medical Store Registration] Set Page 1 Form Data',
  props<{ page1FormData: Page1FormData }>()
);

export const clearMedicalStoreRegistrationData = createAction(
  '[Medical Store Registration] Clear Data'
);
