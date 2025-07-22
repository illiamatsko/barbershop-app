import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { ErrorState, initialErrorState } from './error.state';
import { setFormError } from './error.updaters';

export const ErrorStore = signalStore(
  { providedIn: 'root' },
  withState<ErrorState>(initialErrorState),
  withMethods(store => ({
    setFormError: (message: string) => patchState(store, setFormError(message))
  }))
)
