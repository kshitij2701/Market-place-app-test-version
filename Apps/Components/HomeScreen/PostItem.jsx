import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function PostItem({item}) {

  const navigation=useNavigation();
  return (
    <TouchableOpacity className="flex-1 m-2 p-2 rounded-lg
    border-slate-200 border-[1px]"
    onPress={()=>navigation.push('product-detail',
    {
       product:item
    })}>
        <Image source={{uri: item.image}}
             className="h-[140px] w-full rounded-lg"
             
        />
        <View>
          <Text className="text-[14px] font-bold mt-2">{item.title}</Text>
          <Text className="text-[18px] font-bold text-blue-500">Free</Text>
          <Text className="text-[10px] mt-1 text-center text-blue-500 bg-blue-200 p-[2px]
            rounded-full px-1 w-[70px]">{item.category}</Text>
        </View>

    </TouchableOpacity>
  )
}