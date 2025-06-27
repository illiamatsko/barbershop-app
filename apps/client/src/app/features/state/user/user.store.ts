import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { userInitialSlice, userSlice } from './user.slice';
import { setUser } from './user.updaters';
import { computed } from '@angular/core';

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState<userSlice>(userInitialSlice),
  withMethods((store) => ({
    setUser: (res: userSlice) => patchState(store, setUser(res)),
  })),
  withComputed((store) => ({
    isSignedIn: computed(() => !!store.token()),
  }))
);
