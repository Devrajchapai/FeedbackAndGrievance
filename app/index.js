import { NavigationContainer } from "@react-navigation/native"
import Layout from "./_layout"
import { navigationRef } from "../navigation/RootNavigation";

const index = () => {
  
  return ( 
  
    <NavigationContainer ref={navigationRef}>
      <Layout />
    </NavigationContainer>   
 
  )
}


export default index