import { View, Text, FlatList,StyleSheet } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';
import { useFonts } from 'expo-font';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { fonts } from '../../../assets/theme';

const urun_tip = [
    { name: 'Laptop', link: './laptopEkle' },
    { name: 'Telefon', link: './telefonEkle' },
    { name: 'Kulaklık', link: './kulaklikEkle' },
    { name: 'Klavye', link: './klavyeEkle' },
  ];
const teknolojiEkle = () => {

      
  return (
    <View>
     


      <View style={{marginTop:70}}>
        <FlatList data={urun_tip}
                keyExtractor={( item ) => item.id}
                renderItem={({item}) => {
                    return (
                    <TouchableOpacity>
                        <Link href={item.link} style={{padding:15, borderBottomWidth:1}}>
                            <Text style={{fontSize: 25,fontFamily:fonts.lightItalic}}>{item.name}</Text>
                        </Link>
                        
                    </TouchableOpacity>                 
                    )
                }}>

      </FlatList>
      </View>
      
    </View>
  )
}

export default teknolojiEkle

const styles = StyleSheet.create({
  container: {
       
      fontSize: 25,
      color: '#3AB4BA',
      alignItems: 'flex-start',
      
      marginTop: 80,
      marginLeft:30
  },
  textHeaderStyle:{
    fontFamily:fonts.semiBold,
    fontSize:25,
    marginLeft:0,
    marginTop:50,
    color:'white',
    alignSelf:'center'
    
  },
  textInputStyle:{
    
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#8F8F8F',
    width: '90%',
    height: 40,
    fontSize: 20,
    opacity: 1,
    marginTop: 20,
    fontFamily:fonts.mediumItalic,
    paddingHorizontal:10
  },
  image:{
    position:'absolute',
    width:220,
    height:100,
    marginLeft: 100,
    marginTop:150
    
  },
  button:{
    color:'#004BFE',
    marginTop:30,
    alignSelf:'flex-end',
    marginRight:60,
    width:100,
    height:100,
  }

})
