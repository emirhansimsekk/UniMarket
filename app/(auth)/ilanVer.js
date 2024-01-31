import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { fonts } from '../../assets/theme';

const IlanVer = () => {

  return (
    <View>
      
      <View>
          <Text style={styles.textStyle}>Kategoriler</Text>
       <View style={{flexDirection:'column',justifyContent: 'space-between'}}>
         
          <View style={{flex: 1}}>         
            <Link href={"../screens/addProduct/addBook"} style={{marginLeft: 25, marginBottom: 15,
              ...styles.buttonStyle}}>
                <Text style={styles.buttonTextStyle}>Kitap</Text></Link>
            <Link href={"../screens/addProduct/addSportEquipment"} style={{marginLeft: 25, marginBottom: 15,
              ...styles.buttonStyle}}><Text style={styles.buttonTextStyle}>Spor</Text></Link>
            <Link href={"../screens/addProduct/addTechnology"} style={{marginLeft: 25, marginBottom: 15,
              ...styles.buttonStyle}}><Text style={styles.buttonTextStyle}>Teknoloji</Text></Link>
              <Link href={"/urunDetay"} style={{marginLeft: 25,marginBottom:15, ...styles.buttonStyle}}><Text style={styles.buttonTextStyle}>Giyim</Text></Link>

          </View>
       </View>   
      </View>
    </View>
    
  )
}

export default IlanVer

const styles=StyleSheet.create({
    textStyle:{
      fontSize: 40,
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
      

    },
    textHeaderStyle:{
      
      fontSize:25,
      marginLeft:0,
      marginTop:50,
      color:'white',
      alignSelf:'center'
      
    },
    buttonStyle:{
      width:175,
      height:55,
      backgroundColor: '#4F80FF',
      alignItems: 'center',
      borderRadius: 15,
      
      textAlignVertical: 'center',
      textAlign: 'center',
      
      
    },
    buttonTextStyle:{
      fontSize:30,  
      color: '#fff', 
      width: '100%',
      
      

    }
})