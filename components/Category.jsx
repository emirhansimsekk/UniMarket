import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

const Category = ({title,url}) => {

  return (
    <View style={styles.container}>

      <View style={styles.imageViewStyle}><Image style={{width:100,height:100}} source={url ? {uri: url}} ></Image></View>
      <View style={styles.textViewStyle} ><Text style={styles.textStyle}>{title}</Text></View>

    </View>
  )
}

export default Category

const styles = StyleSheet.create({
    container : {
      backgroundColor:'white',
      width:'90%',
      height:150,
      alignSelf:'center',
      borderRadius:10,
      flexDirection:'row',
      marginBottom:20,
      shadowColor:'black',
      shadowOffset: {
        width:10,
        height: 100
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 10
    },
    textViewStyle:{
      
      alignSelf:'center',
      width:240,
      height:100,
      justifyContent:'center',
      alignItems:'center',
      marginLeft:10
    },
    imageViewStyle:{
      
      alignItems:'center',
      justifyContent:'center',
      alignSelf:'center',
      marginLeft:20
      
    },
    textStyle:{
      fontSize:35
    }

})

