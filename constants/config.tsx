import Constants from 'expo-constants';
import { Platform } from 'react-native';

const environments = {
  "dev": {
    apiHost: "https://funk.derekbarrera.com",
    oauth_client_id: "catalyst_app",
    oauth_client_scope: 'offline_access offline openid',
    oauth_oidc_url: "https://funk.derekbarrera.com/oauth",
    oauth_redirect_uri: Platform.select({
      web: input => 'https://localhost:19006',
      default: input => 'org.catalyst.client:/oauthredirect',
    })()
  },
  "staging": {
    apiHost: "https://funk.derekbarrera.com",
    oauth_client_id: "catalyst_app",
    oauth_client_scope: 'offline_access offline openid',
    oauth_oidc_url: "https://funk.derekbarrera.com/oauth",
    oauth_redirect_uri: Platform.select({
      web: input => 'https://funk.derekbarrera.com',
      default: input => 'org.catalyst.client:/oauthredirect',
    })()
  },
  "qa": {
    apiHost: "https://funk.derekbarrera.com",
    oauth_client_id: "catalyst_app",
    oauth_client_scope: 'offline_access offline openid',
    oauth_oidc_url: "https://funk.derekbarrera.com/oauth",
    oauth_redirect_uri: Platform.select({
      web: input => 'https://funk.derekbarrera.com',
      default: input => 'org.catalyst.client:/oauthredirect',
    })()
  },
  "prod": {
    apiHost: "https://funk.derekbarrera.com",
    oauth_client_id: "catalyst_app",
    oauth_client_scope: 'offline_access offline openid',
    oauth_oidc_url: "https://funk.derekbarrera.com/oauth",
    oauth_redirect_uri: Platform.select({
      web: input => 'https://funk.derekbarrera.com',
      default: input => 'org.catalyst.client:/oauthredirect',
    })()
  }
};

const commonConfigs = {
  // add common configs here
}


const env = Constants.manifest.releaseChannel || 'dev';

export const config: {
  apiHost: string;
  oauth_client_id: string;
  oauth_client_scope: string;
  oauth_oidc_url: string;
  oauth_redirect_uri: string;
} = {
  ...commonConfigs,
  ...environments[env],
};