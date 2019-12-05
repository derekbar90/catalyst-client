import React,{ useState, useEffect } from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import AppNavigation from './navigation/AppNavigation';
import { Provider } from 'react-redux'
import Gate, { store } from './stores/store';
import NavigationService from './navigation/NavigationService';

import { ApolloClient } from '@apollo/client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from "@apollo/react-hooks"
import { persistCache } from 'apollo-cache-persist';
import { config } from './constants/config';
import { apolloLinks } from './services/graphql/links';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

const App: React.FC = () => {
  const [client, setClient] = useState(undefined);
  useEffect(() => {
    const cache = new InMemoryCache({});

    const client = new ApolloClient({
      cache,
      link: apolloLinks
    });

    persistCache({
      cache,
      storage: AsyncStorage,
    }).then(() => {
      const initData = {};
      client.writeData({
        data: initData
      });
      client.onResetStore(async () => cache.writeData({ data: initData }));
      setClient(client);
    });
    return () => {};
  }, []);
  if (client === undefined) return <View><Text>Loading</Text></View>;
  return (
    <View style={styles.container}>
      <Gate>
        <Provider store={store}>
          <ApolloProvider client={client}>
            <AppNavigation
              ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}
            />
          </ApolloProvider>
        </Provider>
      </Gate>
    </View>
  );
};
export default App;
