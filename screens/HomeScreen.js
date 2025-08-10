import { useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';

const HomeScreen = (props) => {
const [email, setEmail] = useState('loading');

 
  return (
    <View  >
      <Text style ={{fontSize: 18}}>Your email is {email}</Text>
      <Button 
                icon="account-arrow-right" 
                mode="contained" 
                onPress={() => props.navigation.navigate('login')}
                style={{marginLeft: 18, marginRight: 18, marginTop: 18}}
            >
                Logout
            </Button> 
    </View>
  )
}

export default HomeScreen