import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import axios from "axios";
import { useUser } from '@clerk/clerk-expo'; 
import { Link } from 'expo-router';
import { useClerk } from "@clerk/clerk-expo";
const BASE_URL = "http://192.168.1.112:8000";
const kisaText = (text, length) => {
  if (text.length > length) {
    return text.substring(0, length - 3) + "...";
  }
  return text;
};
const urunDetay = () => {
  const {user} = useUser()
  console.log("userid: ",user.id)
  const { client } = useClerk();
  const params = useLocalSearchParams();
  const { product_id, cat_id } = params;
  console.log(product_id);
  const [isLiked, setIsLiked] = useState(false)
  const apiUrl = `${BASE_URL}/products/id=${product_id}`;
  const [book, setBook] = useState(null);
  const [clerkId, setClerkId] = useState("");
  const [phone, setPhone] = useState("");
  const [productsByCat, setProductsByCat] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        await axios
        .get(apiUrl)
        .then((response) => {
          setBook(response.data.children[0]);
          setPhone(response.data.phone_number)
        })
        .catch((error) => {
          console.error("Veri çekme hatası:", error);
        });
    
        console.log("user---",book);
        console.log("bookcat---",cat_id);
        await axios.get(`${BASE_URL}/products/cat_id=1`)
        .then((response) => {
          setProductsByCat(response.data.children);
          
        })
        .catch((error) => {
          console.error('Veri çekme hatası:', error);
        });

        await axios.get(`${BASE_URL}/isFav/product_id=${product_id};user_id=${user.id}`)
        .then((response) => {
          console.log("isFav:", response.data)
          if(response.data == true){
            setIsLiked(true)
          }else{
            setIsLiked(false)
          }
          
        })
        
    };

    
    fetchData()
    //fetchDataProductByCat()
    
  }, [product_id,cat_id]);

  const favProduct = async (product_id, user_id) => {
    var favProduct = {
      user_id: user_id,
      product_id: product_id
    }
      await axios.post(`${BASE_URL}/wishlist`,favProduct)
  }
  const unFavProduct = async (product_id, user_id) => {
    console.log("unfav")
    console.log("prod_id--"+product_id+ "user_id--"+user_id)
    var favProduct = {
      user_id: user_id,
      product_id: product_id
    }
      await axios.post(`${BASE_URL}/deleteFromWishlist`,favProduct)
  }
  console.log("catproduct-----", productsByCat)
  /*const fetchDataByCategory = () => {
        axios.get(`http://192.168.1.9:8000/`)
          .then((response) => {
            setBook(response.data.children);
          })
          .catch((error) => {
            console.error('Veri çekme hatası:', error);
          });
      };
    
      useEffect(() => {
        fetchData(); 
      }, []); */

  return (
    <View horizontal style={{width:"100%", flex:1}}>
      {!!book && (
        <View style={{width:"100%"}}>
          <View style={{width:"100%"}}>
            <Image
              source={{ uri: book.image_url }}
              style={{
                width: 300,
                height: 400,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                alignSelf:"center",
              }}
            />
          </View>
          <View
            style={{
              position: "absolute",
              width: "100%",
              backgroundColor: "white",
              height: 525,
              marginTop: 300,
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
            }}
          >
            <View style={{ flexDirection: "column" }}>
              <View>
                <Text
                  style={{
                    fontSize: 30,
                    padding: 15,
                    position: "absolute",
                    marginTop: 10,
                    marginBottom:50
                  }}
                >
                  {kisaText(book.title, 20)}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    marginLeft:20,
                    marginTop:75,
                    fontWeight:"300",
                    position: "absolute",
                    
                  }}
                >
                  {phone?.slice(2)}
                </Text>{isLiked ? (
                  <TouchableOpacity onPress={()=>{
                                                  setIsLiked(false)
                                                  unFavProduct(product_id, user.id)

                                                  }}>
                      <FontAwesome style={{position:"absolute", alignSelf:"flex-end", marginTop:10, right:10}}  name="heart" size={48} color="red" />
                  </TouchableOpacity>
                   
                      ) : (
                    <TouchableOpacity onPress={()=>{
                                                    setIsLiked(true)
                                                    favProduct(product_id, user.id)
                                                    }}>
                      <FontAwesome5  style={{position:"absolute", alignSelf:"flex-end", marginTop:10, right:10}} name="heart-broken" size={48} color="red" />
                    </TouchableOpacity>    
                    
                  )}
                
              </View>
              
              <View>
                <Text
                  style={{
                    color: "#000",
                    marginTop: 80,
                    marginLeft: 301,
                    fontSize: 20,
                  }}
                >
                  {book.price} TL
                </Text>
              </View>
            </View>
            <Text
              style={{
                fontSize: 20,
                marginLeft: 25,
                fontWeight: "400",
                position: "absolute",
                marginTop: 120,
              }}
            >
              {kisaText(book.description, 150)}
            </Text>
          </View>
          <View>    
            <ScrollView style={styles.funStyle}>
        
        <View style={{marginTop:5, marginLeft:20}}>
          <View style={{flexDirection:'row',justifyContent:'space-between',width:'95%'}}>
            <Text style ={{fontSize:25,textAlign:'right'}}> İlginizi Çekebilir</Text>

          </View>
            
              <ScrollView horizontal style= {{height:175,backgroundColor:'white'}}>
              {productsByCat?.map(item => {
              const title = item.title || 'Başlık Yok';
              const author = item.author || 'Yazar Bilgisi Yok';
              const price = item.price || 'Fiyat Bilgisi Yok';
              const description = item.description || 'Açıklama yok';
              const thumbnail = item.image_url
              const product_id = item.product_id;
              return (
              <View key={item.id}   >
                <Link href={{
                    pathname: "./urunDetay",
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
        </View>
      )}
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
    marginTop: 150, 
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

export default urunDetay;
