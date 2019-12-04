import { AuthorizationRequest } from "@openid/appauth/built/authorization_request";
import {
  AuthorizationNotifier,
  AuthorizationRequestHandler,
} from "@openid/appauth/built/authorization_request_handler";
import { AuthorizationServiceConfiguration } from "@openid/appauth/built/authorization_service_configuration";
import { RedirectRequestHandler, FetchRequestor, RevokeTokenRequest} from "@openid/appauth/built";
import {
  GRANT_TYPE_AUTHORIZATION_CODE,
  GRANT_TYPE_REFRESH_TOKEN,
  TokenRequest
} from "@openid/appauth/built/token_request";
import {
  BaseTokenRequestHandler,
  TokenRequestHandler
} from "@openid/appauth/built/token_request_handler";

import {
  TokenResponse
} from "@openid/appauth/built/token_response";

import { StringMap } from "@openid/appauth/built/types";
import dispatch from "../stores/dispatch";
import NavigationService from "../navigation/NavigationService";
import { IAuthService } from "./AuthService";

/* the Node.js based HTTP client. */
const requestor = new FetchRequestor();

let openIdConnectUrl = "https://funk.derekbarrera.com/oauth";

/* example client configuration */
const clientId = 'catalyst_app';
const redirectUri = "https://192.168.4.23:19006/";
const scope = 'offline_access offline openid';

export class AuthService implements IAuthService {
  private notifier: AuthorizationNotifier;
  private authorizationHandler: AuthorizationRequestHandler;
  private tokenHandler: TokenRequestHandler;

  // state
  private configuration: AuthorizationServiceConfiguration|undefined;
  private request: AuthorizationRequest|undefined;
  private code: string|undefined;
  private tokenResponse: TokenResponse|undefined;

  constructor() {
    this.notifier = new AuthorizationNotifier();
    this.authorizationHandler = new RedirectRequestHandler();
    this.tokenHandler = new BaseTokenRequestHandler(requestor);
    // set notifier to deliver responses
    this.authorizationHandler.setAuthorizationNotifier(this.notifier);
    // set a listener to listen for authorization responses
    this.notifier.setAuthorizationListener((request, response, error) => {
      console.log('Authorization request complete ', request, response, error);
      if (response) {
        this.request = request;
        this.code = response.code;
        this.showMessage(`Authorization Code ${response.code}`);
        this.makeTokenRequest();
      }
    });
    this.completeAuthorizationRequestIfPossible();
  }

  showMessage(message: string) {
    // console.info(message);
  }

  private async fetchServiceConfiguration() {
    return AuthorizationServiceConfiguration.fetchFromIssuer(openIdConnectUrl, requestor)
        .then(response => {
          console.log('Fetched service configuration', response);
          this.configuration = response;
          this.showMessage('Completed fetching configuration');
        })
        .catch(error => {
          console.log('Something bad happened', error);
          this.showMessage(`Something bad happened ${error}`)
        });
  }

  public async login(): Promise<{}> {
    await this.fetchServiceConfiguration();
    // create a request
    let request = new AuthorizationRequest({
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: scope,
      response_type: AuthorizationRequest.RESPONSE_TYPE_CODE,
      state: undefined,
      extras: {'prompt': 'consent', 'access_type': 'offline', 'response_mode': 'fragment'}
    });

    if (this.configuration) {
      this.authorizationHandler.performAuthorizationRequest(this.configuration, request);
      return {};
    } else {
      this.showMessage(
          'Fetch Authorization Service configuration, before you make the authorization request.');
    }
    return {};
  }

  public async logout(accessToken: string): Promise<boolean> {

    if(accessToken === undefined || accessToken === null) {
      return true;
    }

    await this.fetchServiceConfiguration();

    let request = new RevokeTokenRequest({
      client_id: clientId,
      token: accessToken,
      token_type_hint: 'access_token'
    });

    if (this.configuration) {
      const revoked = await this.tokenHandler.performRevokeTokenRequest(this.configuration, request);
      return revoked;
    } else {
      this.showMessage(
          'Fetch Authorization Service configuration, before you make the authorization request.');
      return false;
    }
  }

  private makeTokenRequest() {
    if (!this.configuration) {
      this.showMessage('Please fetch service configuration.');
      return;
    }

    let request: TokenRequest|null = null;
    if (this.code) {
      let extras: StringMap|undefined = undefined;
      if (this.request && this.request.internal) {
        extras = {};
        extras['code_verifier'] = this.request.internal['code_verifier'];
      }
      // use the code to make the token request.
      request = new TokenRequest({
        client_id: clientId,
        redirect_uri: redirectUri,
        grant_type: GRANT_TYPE_AUTHORIZATION_CODE,
        code: this.code,
        refresh_token: undefined,
        extras: extras
      });
    } else if (this.tokenResponse) {
      // use the token response to make a request for an access token
      request = new TokenRequest({
        client_id: clientId,
        redirect_uri: redirectUri,
        grant_type: GRANT_TYPE_REFRESH_TOKEN,
        code: undefined,
        refresh_token: this.tokenResponse.refreshToken,
        extras: undefined
      });
    }

    if (request) {
      this.tokenHandler.performTokenRequest(this.configuration, request)
          .then(response => {
            if (this.tokenResponse) {
              // copy over new fields
              this.tokenResponse.accessToken = response.accessToken;
              this.tokenResponse.issuedAt = response.issuedAt;
              this.tokenResponse.expiresIn = response.expiresIn;
              this.tokenResponse.tokenType = response.tokenType;
              this.tokenResponse.scope = response.scope;
            } else {
              this.tokenResponse = response;
            }

            dispatch().user.updateAuthState({
              ...this.tokenResponse,
              accessTokenExpirationDate: response.expiresIn
            })

            NavigationService.navigate('home', {});

            // unset code, so we can do refresh token exchanges subsequently
            this.code = undefined;
          })
          .catch(error => {
            console.log('Something bad happened', error);
            this.showMessage(`Something bad happened ${error}`)
          });
    }
  }

  async completeAuthorizationRequestIfPossible() {
    await this.fetchServiceConfiguration();
    const authComplete = await this.authorizationHandler.completeAuthorizationRequestIfPossible(false);
  }
}