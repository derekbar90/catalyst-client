import { ApolloLink } from 'apollo-link';
import { RetryLink } from 'apollo-link-retry';
import { HttpLink } from 'apollo-link-http';
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { store } from '../../stores/store';
import { config } from '../../constants/config';

// cached storage for the user accessToken
let accessToken;

const SetAuthorizationLink = setContext(async (request, previousContext) => {
  return {
    headers: {authorization: `Bearer ${previousContext.accessToken}`}
  }
});

const WithTokenLink = setContext(() => {
  if (accessToken) return { accessToken };
  accessToken = store.getState().user.accessToken;
  return { accessToken };
});

const ResetTokenLink = onError(({ networkError }) => {
  if (
      networkError &&
      networkError.name ==='ServerError' &&
      //@ts-ignore
      networkError.statusCode === 401
    ) {
    // remove cached accessToken on 401 from the server
    accessToken = null;
  }
});

export const apolloLinks = ApolloLink.from([
  new RetryLink(),
  WithTokenLink,
  ResetTokenLink,
  SetAuthorizationLink,
  new HttpLink({ uri: `${config.apiHost}/graphql` })
]);