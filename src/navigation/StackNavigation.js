import React, {Component} from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator()

class StackNavigation extends Component{
    constructor(props){
        super(props)
        this.state = {
        }
    }
    render(){
        return(
            <NavigationContainer>
                <Stack.Navigator>    
                </Stack.Navigator>
            </NavigationContainer>

        )
    }

}

export default StackNavigation