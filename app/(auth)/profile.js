import { View, Text,Image, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios'; 
import { Link } from 'expo-router';
import { fonts } from '../../assets/theme'

const Profile = () => {
  const { user } = useUser();
  //const [firstName, setFirstName] = useState(user?.firstName);
  //const [lastName, setLastName] = useState(user?.lastName);
  const [book, setBook] = useState([]);

  const fetchData = () => {
    axios.get(`http://192.168.1.114:8000/products/user_id=${user.id}`)
      .then((response) => {
        setBook(response.data.children);
      })
      .catch((error) => {
        console.error('Veri çekme hatası:', error);
      });
  };

  useEffect(() => {
    fetchData(); 
  }, []);


  const kisaText = (text,length) => {
    if (text.length > length) {
      return text.substring(0, length - 3) + '...';
    }
    return text;
  }

 /* const onSaveUser = async () => {
    try {
      // This is not working!
      const result = await user?.update({
        firstName: firstName,
        lastName: lastName,
      });
      console.log('🚀 ~ file: profile.tsx:16 ~ onSaveUser ~ result:', result);
    } catch (e) {
      console.log('🚀 ~ file: profile.tsx:18 ~ onSaveUser ~ e', JSON.stringify(e));
    }
  };*/

  return (
    <View>
      
      <View style={styles.infoStyle}>
        <View>
          <MaterialCommunityIcons name="face-man-profile" size={100} color="white" style={{marginTop:20}} />
        </View>
        <View style={{marginTop:20, marginLeft:15}}>
          
            <Text style={{fontSize:30,color:'white',  padding:0, }}>{user.firstName} {user.lastName}</Text>
            <Text style={{padding:0,color:'white', }}>{user.primaryEmailAddress.emailAddress}</Text>
            <Text style={{padding:0,color:'white', }}>5356489465</Text>
          
          
        </View>        
      </View>      
      
      <ScrollView style={styles.funStyle}>
        
          <View style={{marginTop:20, marginLeft:20}}>
            <View style={{flexDirection:'row',justifyContent:'space-between',width:'95%'}}>
              <Text style ={{fontSize:25,textAlign:'right'}}> İlanlarım</Text>
              <Link href={"/screens/ads/myAds"}>
                <Text style ={{textAlign:'left',fontSize:15, textDecorationLine:'underline line'}}>Tümünü Gör</Text>
              </Link>
            </View>
              
                <ScrollView horizontal style= {{height:175,backgroundColor:'white'}}>
                {book.map(item => {
                const title = item.title || 'Başlık Yok';
                const author = item.author || 'Yazar Bilgisi Yok';
                const price = item.price || 'Fiyat Bilgisi Yok';
                const description = item.description || 'Açıklama yok';
                const thumbnail = item.image_url
                const product_id = item.product_id;
                return (
                <View key={item.id}   >
                  <Link href={{
                      pathname: "../screens/ads/urunDetay",
                      params: { product_id : product_id }
                    }} asChild>
                    
                    <TouchableOpacity style={{marginLeft:5, width:120,borderRadius:25, borderWidth:0.5}}>
                    
                    <Image source={{ uri: thumbnail}} style={styles.image} />
                    <Text style={styles.textTitleStyle}>{kisaText(title,8)}</Text>
                    
                    <Text style={styles.textPriceStlye}>{price} TL</Text>
                    
                  </TouchableOpacity>
            
            
                  </Link>
                  
                </View>
              )

            })}
                </ScrollView>

        </View>
        
       
        </ScrollView>
        
        
      
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: '#6c47ff',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },infoStyle: {
    backgroundColor:'#4F80FF',
    width:'100%',
    height:250,
    padding: 20,
    flexDirection: 'row',
    position:'absolute'
  },
  funStyle: {
    backgroundColor:'white',
    width:'100%',
    height:530,
    
    
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    marginTop: 180, 
    position:'absolute',
    

  },
  productButtonStyle: {
    marginLeft:15, 
    width:120, 
    borderWidth:0.5, 
    borderRadius:25,
    
  },

  image:{
    
    width:90,
    height:90,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius:15
  },
  textTitleStyle: {
    fontSize:20, 
    borderRadius:25,
    marginLeft:20,
    marginTop:5,
    
    
  },
  textPriceStlye:{
    textAlign:'right',
    marginRight:5,
    marginTop:10,
    
    fontSize:15
  }
  
});

export default Profile;