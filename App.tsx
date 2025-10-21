import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, AddMenuScreen, FilterScreen } from './screens';

export interface Dish {
  id: string;
  name: string;
  description: string;
  course: 'Starter' | 'Main' | 'Dessert';
  price: number;
}

export type RootStackParamList = {
  Home: undefined;
  AddMenu: undefined;
  Filter: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [dishes, setDishes] = useState<Dish[]>([]);

  const addDish = (dish: Omit<Dish, 'id'>) => {
    const newDish: Dish = {
      ...dish,
      id: Date.now().toString(),
    };
    setDishes(prev => [...prev, newDish]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          options={{ title: 'Restaurant Menu' }}
        >
          {props => <HomeScreen {...props} dishes={dishes} />}
        </Stack.Screen>
        <Stack.Screen 
          name="AddMenu" 
          options={{ title: 'Add Menu Item' }}
        >
          {props => <AddMenuScreen {...props} onAddDish={addDish} />}
        </Stack.Screen>
        <Stack.Screen 
          name="Filter" 
          options={{ title: 'Filter Menu' }}
        >
          {props => <FilterScreen {...props} dishes={dishes} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
