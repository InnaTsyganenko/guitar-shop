/* eslint-disable @typescript-eslint/no-explicit-any */
import { store } from '../store/index.js';
import { Guitars, GuitarById, CurrentPageCatalog, PickedId, GuitarsTotalCount, GuitarComments } from './guitars.js';

export type GuitarsData = {
  guitarsTotalCount: GuitarsTotalCount,
  guitars: Guitars,
  guitarsMinPrice: number,
  guitarsMaxPrice: number,
  guitarById: GuitarById,
  isGuitarsLoaded: boolean,
  isGuitarLoaded: boolean,
  guitarComments: GuitarComments,
  isCommentPushed: boolean,
  search: string,
  searchResults: Guitars,
  isGuitarsSortFilterLoaded: boolean,
  sortType: string,
  sortDirection: string,
  filterMinPrice: number,
  filterMaxPrice: number,
  filterGuitarType: string,
  filterStringCount: string,
};

export type GuitarsOperations = {
  pickedId: PickedId,
  currentPageCatalog: CurrentPageCatalog,
  isModalOpen: boolean,
};

export interface Validation {
  required?: {
    value: boolean;
    message: string;
  };
  pattern?: {
    value: string;
    message: string;
  };
  custom?: {
    isValid: (value: string) => boolean;
    message: string;
  };
}

export type ErrorRecord<T> = Partial<Record<keyof T, string>>;

export type Validations<T extends Record<string, any>> = Partial<Record<keyof T, Validation>>;

export interface NewReview {
  guitarId: number,
  userName: string,
  advantage: string,
  disadvantage: string,
  comment: string,
  rating: number,
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
