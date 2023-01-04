import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Intro from './app/screen/Intro';
import NoteScreen from './app/screen/NoteScreen';

export default function App() {
  const [user, setUser] = useState({});
  const findUser = async () => {
    const result = await AsyncStorage.getItem('user');
    if (result !== null) {
      setUser(JSON.parse(result));
    }
  };

  useEffect(() => {
    findUser();
    //AsyncStorage.clear();
  }, []);

  if (!user.name) return <Intro onFinish={findUser} />;

  return <NoteScreen user={user} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
