import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import Dashboard from './screens/Dashboard';
import Profile from './screens/Profile';
import Search from './screens/Search';
import MakePost from './screens/MakePost';
import UserS from './screens/UserS';
import Followers from './screens/Followers';
import Following from './screens/Following';
import Post from './screens/Post';
import Edit from './screens/Edit';
import Coment from './screens/Coment';
import DashboardR from './screens/DashboardR';
import Retweets from './screens/Retweets'
import CRetweet from './screens/CRetweet';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Retweets" component={Retweets} />
        <Stack.Screen name="DashboardR" component={DashboardR} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="MakePost" component={MakePost} />
        <Stack.Screen name="Coment" component={Coment} />
        <Stack.Screen name="CRetweet" component={CRetweet} />
        <Stack.Screen name="Followers" component={Followers} />
        <Stack.Screen name="Following" component={Following} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="UserS" component={UserS} />
        <Stack.Screen name="Edit" component={Edit} />
        <Stack.Screen name="Post" component={Post} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
