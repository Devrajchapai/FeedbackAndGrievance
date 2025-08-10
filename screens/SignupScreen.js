import { useState } from 'react';
import { KeyboardAvoidingView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const SignupScreen = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [passwordVisibility, setPasswordVisible] = useState(false);

  const sendCred =  (props) =>{
  
  }

  return (
    
      <SafeAreaProvider>
        <SafeAreaView>
          <KeyboardAvoidingView behavior='position'>

          
          <View>
            <StatusBar backgroundColor= 'blue' barStyle='dark-content'  />
            <Text style={{fontSize: 35, marginLeft: 18, marginTop: 10, color: 'gray'}}>Welcome to</Text>
            <Text style={{fontSize: 30, marginLeft: 18, color: 'blue'}}>Feedback and Redressal</Text>
            <View  style={{borderBlockColor: "blue", borderBottomWidth: 4, borderRadius: 10, marginLeft:20, marginRight: 100}}/>
            <Text style ={{
              fontSize: 20, marginLeft: 18, marginTop: 20,
            }}> Create New Account </Text>   
               
            <TextInput 
              label='Email'
              value={email}
              onChangeText={setEmail}
              mode='outlined'
              style ={{marginLeft: 18, marginRight: 18, marginTop: 18}}
              theme = {{colors:{primary: "blue"}}}
            />  

            <TextInput 
              label='Password'
              secureTextEntry = {!passwordVisibility}
              value={password}
              onChangeText={setPassword}
              mode='outlined'
              style ={{marginLeft: 18, marginRight: 18, marginTop: 18}}
              theme = {{colors:{primary: "blue"}}}
              right ={<TextInput.Icon icon={passwordVisibility ? 'eye-off' : 'eye'} onPress={()=>{setPasswordVisible(!passwordVisibility)}}/>}
            />
            <Button 
                icon="account-arrow-right" 
                mode="contained" 
                onPress={() => sendCred(props)}
                style={{marginLeft: 18, marginRight: 18, marginTop: 18}}
            >
                Signup
            </Button> 

            <TouchableOpacity>
              <Text style ={{
                fontSize: 18, marginLeft: 18, marginTop: 20,
              }} onPress={()=>props.navigation.navigate("login")}> 
                Already have an account ? 
              </Text> 
            </TouchableOpacity>
            

          </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </SafeAreaProvider>
      
    
    
  )
}

export default SignupScreen