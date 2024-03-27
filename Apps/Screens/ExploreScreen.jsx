import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import LatestItemList from '../Components/HomeScreen/LatestItemList';
import { ScrollView } from 'react-native-gesture-handler';

export default function ExploreScreen() {
  const db=getFirestore(app);
  const [productList, setproductList]=useState([]);
  const [loading, setLoading]=useState(false);
  useEffect(()=>{
      getAllProducts();
  },[])
  /**
   * Used to get all Products
   */
  const getAllProducts=async()=>{
     setproductList([]);
     setLoading(true);
     const q=query(collection(db,'UserPost'), orderBy('createdAt', 'desc'));
     const snapshot=await getDocs(q);
     setLoading(false);

     snapshot.forEach(doc => {
      console.log("Docs:", doc.data());
      setproductList(productList=>[...productList, doc.data()])
     })

  }
  return (
    <ScrollView className="p-5 py-10">
      <Text className="text-[30px] font-bold">Explore More</Text>
      {loading?
         <ActivityIndicator className="mt-24" size={'large'} color={'#3b82f6'} />
        :
      productList?.length>0?
      <LatestItemList latestItemList={productList} 
      />
      :<Text className="p-5 text-[20px] text-gray-400 mt-24 justify-center text-center">No Product Found</Text>}
    </ScrollView>
  )
}