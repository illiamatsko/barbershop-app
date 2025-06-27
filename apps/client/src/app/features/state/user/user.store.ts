import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { userInitialSlice, userSlice } from './user.slice';
import { setUser } from './user.updaters';

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState<userSlice>(userInitialSlice),
  withMethods(store => ({
    setUser: (res: userSlice) => patchState(store, setUser(res))
  }))
)
