import { ApolloLink } from 'apollo-link';
import { RetryLink } from 'apollo-link-retry';
import { HttpLink } from 'apollo-link-http';
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { store } from '../../stores/store';
import { config } from '../../constants/config';

// cached storage for the user accessToken
let accessToken;

const setAuthorizationLink = setContext((request, previousContext) => ({
  headers: {authorization: "1234"}
}));

const asyncAuthLink = setContext(
  request =>
    new Promise((success, fail) => {
      // do some async lookup here
      setTimeout(() => {
        success({ accessToken: "async found accessToken" });
      }, 10);
    })
);

const WithTokenLink = setContext(() => {
  // if you have a cached value, return it immediately
  if (accessToken) return { accessToken };

  accessToken = store.getState().user.accessToken;
  return { accessToken };
});

const ResetTokenLink = onError(({ networkError }) => {
  if (networkError && networkError.name ==='ServerError' && networkError.statusCode === 401) {
    // remove cached accessToken on 401 from the server
    accessToken = null;
  }
});

export const apolloLinks = ApolloLink.from([
  new RetryLink(),
  WithTokenLink,
  ResetTokenLink,
  new HttpLink({ uri: `${config.apiHost}/graphql` })
]);