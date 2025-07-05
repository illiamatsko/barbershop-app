import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { initialAuthState, authState } from './auth.state';
import {setUser} from './auth.updaters';
import { computed } from '@angular/core';

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<authState>(initialAuthState),
  withMethods(store => ({
    setUser: (res: authState) => patchState(store, setUser(res)),
    unsetUser: () => patchState(store, initialAuthState)
  })),
  withComputed((store) => ({
    isSignedIn: computed(() => !!store.token()),
  }))
);
