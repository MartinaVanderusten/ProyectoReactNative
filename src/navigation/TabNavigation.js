//Componentes de terceros
import React, {Component} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome5 } from '@expo/vector-icons';

//Componentes propios
import Home from '../screens/Home/index'
import NewPost from '../screens/NewPost/index'
import Profile from '../screens/Profile/index'

//Desarrollo del código
const Tab = createBottomTabNavigator()

class TabNavigation extends Component{
    constructor(props){
        super(props)
        this.state = {
        }
    }
    render(){
        return(
            <Tab.Navigator screenOptions={ {tabBarShowLabel:false} }>
                <Tab.Screen name='Home' component={Home}
                options={{tabBarIcon: () => <FontAwesome5 name="home" size={24} color="black" />}}/>
                <Tab.Screen name='Profile' component={Profile}
                options={{tabBarIcon: () => <FontAwesome5 name="child" size={24} color="black" />}}/> {/* initialParams para logout */}
                <Tab.Screen name='NewPost' component={NewPost}
                options={{tabBarIcon: () => <FontAwesome5 name="upload" size={24} color="black" />}}/>
            </Tab.Navigator>
        )
    }

}

export default TabNavigation