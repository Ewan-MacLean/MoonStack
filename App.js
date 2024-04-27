import React from 'react';
import { Text, View, Image, ImageBackground, StyleSheet, Pressable } from 'react-native';
import Card from './src/components/Card';
import users from './assets/data/users';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated'
import { registerRootComponent } from 'expo';

const App = () => {

  const sharedValue = useSharedValue(1)

  const cardStyle = useAnimatedStyle(() => ({
    opacity: sharedValue.value,
  }))


  return (
    <View style={styles.pageContainer}>
      <Animated.View style={[styles.animatedCard, cardStyle]}>
        <Card
          user={users[2]}
        />
      </Animated.View>
      <Pressable onPress={()=> sharedValue.value = Math.random()}><Text>Change value</Text></Pressable>
    </View>
  )
}


const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  animatedCard: {
    width: '100%',
    // height: '100%',
    justifyContent: 'center',
    alignItems: 'center',

  }
});

export default App

registerRootComponent(App)