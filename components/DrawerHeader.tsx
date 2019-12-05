import React from 'react';
import {Image, Text, View} from 'react-native';
import styles from './styles/DrawerHeaderStyle';
export interface Props {
  name: string;
}

interface State {
}

export class DrawerHeader extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={{alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-start'}}>
          <Image source={{
            uri: 'http://placekitten.com/60/60'
          }} style={{borderRadius: 30, height: 60, width: 60, backgroundColor: 'lightgrey', marginBottom: 10}} />
          <Text style={{fontWeight: 'bold'}}>{this.props.name}</Text>
        </View>
      </View>
    );
  }
}

