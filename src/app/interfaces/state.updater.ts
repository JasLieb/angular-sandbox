import { Draft } from 'immer';

export interface StateUpdater<TState> {
  updateState(producer: (state: Draft<TState>) => void): void;
}
