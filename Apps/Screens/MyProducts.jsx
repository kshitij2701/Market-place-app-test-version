import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { app } from '../../firebaseConfig'
import { useUser } from '@clerk/clerk-expo';
import LatestItemList from '../Components/HomeScreen/LatestItemList';
import { useNavigation } from '@react-navigation/native';

export default function MyProducts() {
  const db=getFirestore(app);
  const {user} =useUser();
  const [productList,setProductList]=useState([]);
  const navigation=useNavigation();
  const [loading, setLoading]=useState(false);

  useEffect(()=>{
     user&&!navigation&&getUserPost();
  },[user])

  useEffect(()=>{
    navigation.addListener('focus',(e)=>{
       getUserPost();
    })
  },[navigation])

  /**
   * Use to get User Products
   */
  const getUserPost=async()=>{
    setProductList([]);
    setLoading(true);
    const q=query(collection(db,'UserPost'),where('userEmail','==',user.primaryEmailAddress.emailAddress));
    const snapshot=await getDocs(q);
    setLoading(false);

    snapshot.forEach(doc=>{
      console.log(doc.data());
      setProductList(productList=>[...productList,doc.data()]);
    })
  }
  return (
    <View className="p-2">
      {loading?
         <ActivityIndicator className="mt-24" size={'large'} color={'#3b82f6'} />
        :
      productList?.length>0?<LatestItemList latestItemList={productList} 
      />
      :<Text className="p-5 text-[20px] text-gray-400 mt-24 justify-center text-center">No Product Found</Text>}
    </View>
  )
}