import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

const Category = ({name,url}) => {
  return (
    <View style={{backgroundColor:'lightblue'}}>
        <View><Text>{name}</Text></View>
        <View><Image source ={url}></Image></View>
    

    </View>
  )
}

export default Category

