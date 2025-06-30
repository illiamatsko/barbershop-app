import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { initialAuthState, authState } from './auth.state';
import {setUser, unsetUser} from './auth.updaters';
import { computed } from '@angular/core';

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<authState>(initialAuthState),
  withMethods((store) => ({
    setUser: (res: authState) => patchState(store, setUser(res)),
    unsetUser: () => patchState(store, unsetUser())
  })),
  withComputed((store) => ({
    isSignedIn: computed(() => !!store.token()),
  }))
);
