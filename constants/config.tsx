import Constants from 'expo-constants';
import { Platform } from 'react-native';

const HOST_NAME = 'CATALYST_BACKEND_HOST';

const environments = {
  "dev": {
    apiHost: `${HOST_NAME}`,
    oauth_client_id: "catalyst_app",
    oauth_client_scope: 'offline_access offline openid',
    oauth_oidc_url: `${HOST_NAME}/oauth`,
    oauth_redirect_uri: Platform.select({
      web: input => 'https://localhost:19006',
      default: input => 'org.catalyst.client:/oauthredirect',
    })()
  },
  "staging": {
    apiHost: `${HOST_NAME}`,
    oauth_client_id: "catalyst_app",
    oauth_client_scope: 'offline_access offline openid',
    oauth_oidc_url: `${HOST_NAME}/oauth`,
    oauth_redirect_uri: Platform.select({
      web: input => `${HOST_NAME}`,
      default: input => 'org.catalyst.client:/oauthredirect',
    })()
  },
  "qa": {
    apiHost: `${HOST_NAME}`,
    oauth_client_id: "catalyst_app",
    oauth_client_scope: 'offline_access offline openid',
    oauth_oidc_url: `${HOST_NAME}/oauth`,
    oauth_redirect_uri: Platform.select({
      web: input => `${HOST_NAME}`,
      default: input => 'org.catalyst.client:/oauthredirect',
    })()
  },
  "prod": {
    apiHost: `${HOST_NAME}`,
    oauth_client_id: "catalyst_app",
    oauth_client_scope: 'offline_access offline openid',
    oauth_oidc_url: `${HOST_NAME}/oauth`,
    oauth_redirect_uri: Platform.select({
      web: input => `${HOST_NAME}`,
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