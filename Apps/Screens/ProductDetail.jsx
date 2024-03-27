import { View, Text, Image, ScrollView, TouchableOpacity, Linking, Share, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo';
import { collection, deleteDoc, doc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../../firebaseConfig';

export default function ProductDetail({navigation}) {

  const {params}=useRoute();
  const [product, setProduct]=useState([]);
  const {user}=useUser();
  const db=getFirestore(app);
  const nav=useNavigation();

  useEffect(()=>{
       params&&setProduct(params.product);
       shareButton();
  },[params],navigation)

  const sendEmailMessage=()=>{
      const subject='Regarding '+product.title;
      const body="Hi "+product.userName+"\n"+"I am intrested to buy this Product";
      Linking.openURL('mailto:'+product.userEmail+"?subject="+subject+"&body="+body);
  }

  const shareButton=()=>{
    navigation.setOptions({
        headerRight: () => (
            <Ionicons name="share-social-sharp" size={24} 
            onPress={()=>shareProduct()}
            color="white"
            style={{marginRight:15}} />
            ),
      });

  }
  /**
   * Used to Share Product
   */

  const shareProduct=async()=>{
    const content={
        message:product.title+"\n"+product.desc,

    }
    Share.share(content).then(resp=>{
       console.log(resp);
    },(error)=>{
        console.log(error);
    })

  }

  const deleteUserPost=()=>{
    Alert.alert('Do you want to Delete?',"Are you sure you want to Delete this Post?",[
    {
      text:'Yes',
      onPress:()=>deleteFromFirestore()
    },
    {
       text:'Cancel',
       onPress:()=>console.log('cancel pressed'),
       style:'cancel',
      }

    ])
  }

  const deleteFromFirestore=async()=>{
       console.log('deleted');
       const q=query(collection(db,'UserPost'),where('title','==',product.title))
        
       const snapshot=await getDocs(q);
       snapshot.forEach(doc=>{
        deleteDoc(doc.ref).then(resp=>{
            console.log("Deleted the Post...");
            nav.goBack();
        })
       })
  }

  return (
    <ScrollView className="bg-white">
       <Image source={{uri:product.image}}
           className="h-[320px] w-full"
       />

       <View className="p-3">
            <Text className="text-[24px] font-bold">{product?.title}</Text>
            <View className="items-baseline">
                <Text className="p-1 rounded-full mt-2 bg-blue-200 text-blue-500">
                    {product.category}
                </Text>
            </View>
            <Text className="mt-3 font-bold text-[20px]">Description</Text>
            <Text className="text-[17px] text-gray-500">{product?.desc}</Text>
       </View>

       {/* User info */}
       <View className="p-3 flex flex-row items-center gap-3 bg-blue-100 border-gray-400">
           <Image source={{uri:product.userImage}} 
              className="w-12 h-12 rounded-full"
           />
           <View>
                <Text className="font-bold text-[18px]">{product.userName}</Text>
                <Text className="text-gray-500">{product.userEmail}</Text>
           </View>
       </View>
       {user?.primaryEmailAddress.emailAddress==product.userEmail?
       <TouchableOpacity 
       onPress={()=>deleteUserPost()}
       className="z-40 bg-red-500 p-4 m-2 rounded-full">
           <Text className="text-center text-white">Delete Post</Text>
       </TouchableOpacity>
       :
       <TouchableOpacity 
       onPress={()=>sendEmailMessage()}
       className="z-40 bg-blue-500 p-4 m-2 rounded-full">
           <Text className="text-center text-white">Send Message</Text>
       </TouchableOpacity>
      }
       
    </ScrollView>
  )
}