import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Text, View } from 'react-native';
import { iRootState, select } from '../stores/store';
import { useSelector } from 'react-redux';

interface User {
  email: string,
  lastName: string,
  firstName: string
}

interface GetUsersData {
  users: User[];
}

interface GetUsersVars {
  limit: number;
  sort: string;
}

const GET_USERS = gql`
  query users($limit: Int!, $sort: String!){
      users(limit: $limit, sort: $sort){
        email,
        firstName,
        lastName
      }
  }
`;

const selectMap = models => ({
  isLoggedIn: models.user.isLoggedIn
})

const mapState = (state: iRootState) => select(selectMap)(state, null)

export function UserList() {
  const { isLoggedIn } = useSelector(mapState)
  const { loading, data } = useQuery<GetUsersData, GetUsersVars>(
    GET_USERS,
    {
      variables: {
        limit: 100,
        sort: "email"
     }
    }
  );

  return (
    !isLoggedIn ? (
      <View>
        <Text>Please login...</Text>
      </View>
    ) :
    loading ? (
      <View>
        <Text>Loading...</Text>
      </View>
    ) : (
      <View>
        <Text style={{fontWeight: 'bold'}}>Current Catalyst Users:</Text>
        {
        data && data.users.map((inventory, key) => (
          <Text key={key}>{inventory.firstName} {inventory.lastName}</Text>
        ))}
      </View>
    )

  );
}