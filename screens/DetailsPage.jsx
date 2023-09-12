import { View, Text, Image  } from 'react-native'
import React from 'react'
import { mosques } from '../data'

export default function DetailsPage() {
  return (
        <View className="flex-1  bg-gray-100">
            <Image className={"w-full h-60 rounded-b-2xl"} source={{uri:mosques[0].img}}></Image>
            <View className="p-4">
                <Text className="text-5xl font-bold text-gray-800 py-2">{mosques[0].name}</Text>
                <Text className="text-2xl font-bold text-gray-800 py-2">أوقات الإقامة</Text>
                <View className="flex flex-row-reverse">
                  <View className="flex-1 items-center bg-white py-2 rounded-xl mx-1">
                      <Text className="text-lg font-bold text-gray-800 ">الفجر</Text>
                      <Text className="text-3xl font-bold text-gray-800 ">21</Text>
                      <Text className="text-md  text-gray-800 ">دقيقة</Text>
                  </View>
                  <View className="flex-1 items-center bg-white py-2 rounded-xl mx-1">
                      <Text className="text-lg font-bold text-gray-800 ">الظهر</Text>
                      <Text className="text-3xl font-bold text-gray-800 ">15</Text>
                      <Text className="text-md  text-gray-800 ">دقيقة</Text>
                  </View>
                  <View className="flex-1 items-center bg-white py-2 rounded-xl mx-1">
                      <Text className="text-lg font-bold text-gray-800 ">العصر</Text>
                      <Text className="text-3xl font-bold text-gray-800 ">16</Text>
                      <Text className="text-md  text-gray-800 ">دقيقة</Text>
                  </View>
                  <View className="flex-1 items-center bg-white py-2 rounded-xl mx-1">
                      <Text className="text-lg font-bold text-gray-800 ">المغرب</Text>
                      <Text className="text-3xl font-bold text-gray-800 ">8</Text>
                      <Text className="text-md  text-gray-800 ">دقيقة</Text>
                  </View>
                  <View className="flex-1 items-center bg-white py-2 rounded-xl mx-1">
                      <Text className="text-lg font-bold text-gray-800 ">العشاء</Text>
                      <Text className="text-3xl font-bold text-gray-800 ">11</Text>
                      <Text className="text-md  text-gray-800 ">دقيقة</Text>
                  </View>
                </View>
                <Text className="text-2xl font-bold text-gray-800 py-2">مرافق المسجد</Text>
                <View className="flex-row justify-end gap-2">
                  <View className="px-6 py-3 bg-white rounded-xl">
                      <Text>مصلى للنساء</Text>
                  </View>
                  <View className="px-6 py-3 bg-white rounded-xl">
                      <Text>دورات مياه</Text>
                  </View>
                  <View className="px-6 py-3 bg-white rounded-xl">
                      <Text>صلاة الجمعة</Text>
                  </View>
                </View>
            </View>
        </View>
  )
}