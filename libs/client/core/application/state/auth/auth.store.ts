import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { initialAuthState, AuthState } from './auth.state';
import {setUser} from './auth.updaters';
import { computed } from '@angular/core';

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<AuthState>(initialAuthState),
  withMethods(store => ({
    setUser: (res: AuthState) => patchState(store, setUser(res)),
    unsetUser: () => patchState(store, initialAuthState)
  })),
  withComputed((store) => ({
    isSignedIn: computed(() => !!store.token()),
  }))
);
