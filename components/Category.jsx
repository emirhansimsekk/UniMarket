import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font'

const Category = ({title,url}) => {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-MediumItalic': require('../assets/fonts/Poppins-MediumItalic.ttf'),
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-LightItalic': require('../assets/fonts/Poppins-LightItalic.ttf'),
    'Poppins-ExtraLightItalic': require('../assets/fonts/Poppins-ExtraLightItalic.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>

      <View style={styles.imageViewStyle}><Image style={{width:100,height:100}} source={{uri: url}} ></Image></View>
      <View style={styles.textViewStyle} ><Text style={styles.textStyle}>{title.slice(0,1).toUpperCase() + title.slice(1, title.length)}</Text></View>

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
      fontSize:35,
      fontFamily:'Poppins-SemiBold'
    }

})

