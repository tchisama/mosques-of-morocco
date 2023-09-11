import { View, Text } from 'react-native'
import React from 'react'

export default function BottomCard() {
  return (
      <View className="absolute w-full bottom-0 p-2">
        <View className="bg-[#606c38]  flex-row justify-between p-3  rounded-2xl  ">
          <View>
            <Text className="text-3xl text-[#e9f1ce] font-semibold">03:15</Text>
            <Text className="text-lg text-[#e9f1ce] font-semibold">00:15:20</Text>
          </View>
          <View>
            <Text className="text-3xl text-[#e9f1ce] font-semibold">صلاة العصر</Text>
            <Text className="text-lg text-[#e9f1ce] font-semibold">باق على الاذان</Text>
          </View>
        </View>
      </View>
  )
}