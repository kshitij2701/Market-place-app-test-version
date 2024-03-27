import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function Categories({categoryList}) {

  const navigation=useNavigation();
  return (
    <View className="mt-2">
      <Text className="font-bold text-[20px]">Categories</Text>
      <FlatList
         data={categoryList}
         numColumns={3}
         renderItem={({item,index})=>(
           <TouchableOpacity
           onPress={()=>navigation.navigate('item-list',{
            category:item.name
           })}
           className="flex-1 items-center 
           justify-center p-2 border-[1px] border-blue-200 
           m-1 h-[80px] rounded-lg bg-blue-50">
             <Image source={{uri:item.icon}}
             className="w-[40px] h-[40px]"
             />
             <Text className="text-[12px] mt-1">
              {item.name}
             </Text>
           </TouchableOpacity>

         )}
      />
    </View>
  )
}





// import { View, Text, FlatList, Image } from 'react-native';
// import React from 'react';

// export default function Categories({ categoryList }) {
//   return (
//     <View style={{ marginTop: 3 }}>
//       <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Categories</Text>
//       <FlatList
//         data={categoryList}
//         numColumns={3}
//         renderItem={({ item }) => (
//           <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 2, borderWidth: 1, borderColor: 'gray', margin: 1, height: 80, borderRadius: 8 }}>
//             <Image
//               source={{ uri: item.icon }}
//               style={{ width: 40, height: 40 }}
//             />
//             <Text style={{ fontSize: 12, marginTop: 1 }}>{item.name}</Text>
//           </View>
//         )}
//         keyExtractor={(item, index) => index.toString()}
//       />
//     </View>
//   );
// }
