import { Draft } from 'immer';

export interface IStore<T> {
  updateState(producer: (state: Draft<T>) => void): void;
}
