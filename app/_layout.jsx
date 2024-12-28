import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import WelcomeScreen from "./welcome";
import {Ionicons} from "@expo/vector-icons";
import Index from "./index";
import MovieDetail from "./moviedetail";
import AddToWatchlist from "./addtowatchlist";
import WatchList from "./watchlist";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = ({ navigation }) => (
    <Tab.Navigator
        screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
                let iconName;
                if(route.name === 'Home') {
                    iconName = focused ? 'home' : 'home-outline';
                }
                else if(route.name === 'Watchlist') {
                    iconName = focused ? 'list' : 'list-outline';
                }
                else if(route.name === 'AddToWatchlist') {
                    iconName = focused ? 'add-circle' : 'add-circle-outline';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#1a1a2e',
            tabBarInactiveTintColor: 'gray',
        })}
    >
        <Tab.Screen
            name="Home"
            component={Index}
            options={{ title: 'Home' }}
        />
        <Tab.Screen
            name="AddToWatchlist"
            component={props => <AddToWatchlist {...props} route={{...props.route, params: { from: 'TabNavigator' }}} /> }
            options={{ title: 'Add Watchlist' }}
        />
        <Tab.Screen
            name="Watchlist"
            component={WatchList}
            options={{ title: 'Watchlist' }}
        />
    </Tab.Navigator>
)

export default function RootLayout() {
  return (
        <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName="Welcome"
        >
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="MainApp" component={TabNavigator} />
            <Stack.Screen name="MovieDetail" component={MovieDetail} />
            <Stack.Screen name="AddToWatchList" component={AddToWatchlist} />
        </Stack.Navigator>
  )
}
