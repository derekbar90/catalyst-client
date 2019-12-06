import { authAsync, revokeAsync, OAuthProps, OAuthRevokeOptions } from 'expo-app-auth';

export interface IAuthService {
  login: () => Promise<{}>;
  logout: (accessToken: string) => Promise<boolean>;
};

export class AuthService implements IAuthService {
  config: OAuthProps;

  constructor(config: OAuthProps){
    this.config = config;
  }

  public async login(): Promise<{}> {
    return authAsync(this.config);
  }

  public async logout(accessToken: string): Promise<boolean> {
    if(accessToken === undefined || accessToken === null) {
      return true
    }

    const revokeOptions: OAuthRevokeOptions = {
      token: accessToken
    }

    try {
      await revokeAsync(this.config, revokeOptions)
      return true
    } catch (e) {
      console.log(e.message)
      return false
    }
  }
}