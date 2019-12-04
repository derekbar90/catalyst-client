import { createModel } from '@rematch/core'
import { Dispatch } from '../store'
import { Platform, Linking } from 'react-native';
import * as AppAuth from 'expo-app-auth';
import { AuthService } from '../../services/AuthService';
import JwtDecode from 'jwt-decode';

export type UserState = {
  userName?: string,
  accessToken?: string,
  accessTokenExpirationDate?: string,
  idToken?: string,
  refreshToken?: string,
  tokenType?: string,
}

export const config = {
  issuer: 'https://funk.derekbarrera.com/oauth',
  scopes: ['offline_access', 'offline', 'openid'],
  redirectUrl: 'org.catalyst.client' + ':/oauthredirect',
  clientId: 'catalyst_app',
};

const service = new AuthService(config);

const INITIAL_STATE = {
  userName: null,
  accessToken: null,
  accessTokenExpirationDate: null,
  idToken: null,
  refreshToken: null,
  tokenType: null,
};

const model = {
	state: INITIAL_STATE,
	reducers: {
      updateAuthState: (state: UserState, payload: Omit<UserState, 'userName'>): UserState =>
			({
        ...state,
        ...payload,
      })
	},
	effects: (dispatch: Dispatch) => ({
		async login(payload: UserState = {}) {
      let authState = {}

      if(Platform.OS === 'web'){
        await service.login();
      } else {
        authState = await AppAuth.authAsync(config);
      }

			dispatch.user.updateAuthState(authState);
    },
    async logout(payload: UserState, state: UserState) {

      const loggedOut = await service.logout(state.accessToken);

      if (loggedOut) {
        dispatch.user.updateAuthState(INITIAL_STATE);
      }

		},
  }),
  selectors: (slice, createSelector, hasProps) => ({
		isLoggedIn() {
			return slice(state => {
        try {
          const jwt: {
            exp: number
          } = JwtDecode(state.idToken);
          var current_time = Date.now() / 1000;
          if ( jwt.exp < current_time) {
            return false;
          } else {
            return true;
          }
        } catch {
          return false;
        }
      })
    },
    firstName() {
			return slice(state => {
        try {
          const jwt: {
            firstName: string
          } = JwtDecode(state.idToken);

          return jwt.firstName
        } catch(e){
          return null
        }

      })
		},
	}),
}

export const user: typeof model = createModel(model)