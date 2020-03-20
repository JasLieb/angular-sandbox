import { Draft } from 'immer';

export interface IStateUpdater<TState> {
  updateState(producer: (state: Draft<TState>) => void): void;
}
