import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppNavigator from '@navigation/AppNavigator'

export default function App() {
  return (
    <View style={styles.wrapper}>
      <AppNavigator />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper:{
    flex: 1
  }
})