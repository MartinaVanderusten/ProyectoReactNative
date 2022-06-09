import React, {Component} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator()

class TabNavigation extends Component{
    constructor(props){
        super(props)
        this.state = {
        }
    }
    render(){
        return(
            <Tab.Navigator>
                <Tab.Screen/>
                <Tab.Screen/>
            </Tab.Navigator>
        )
    }

}

export default TabNavigation