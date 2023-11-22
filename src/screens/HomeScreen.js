import { View,ScrollView,Image,Text, TextInput} from 'react-native'
import React ,{useEffect, useState}from 'react'
import {StatusBar} from 'expo-status-bar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Feather } from '@expo/vector-icons';
import Categories from '../components/categories';
import axios from 'axios';
import Rescipes from '../components/recipes';
const HomeScreen = () => {


  const [activeCategory,setActiveCategory]=useState('Beef');
  const [categories,setCategories]=useState([])
  const [meals,setMeals]=useState([])

  useEffect(()=>{
    getCategories();
    getRecipes();
  },[])

  const handleChangeCategory=category=>{
    getRecipes(category);
    setActiveCategory(category);
    setMeals([])
  }

  const getCategories=async()=>{
    try{
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
      // console.log('got categories',response.data) 
      if(response && response.data){
        setCategories(response.data.categories)
      }
    }
    catch(err){
      console.log('error: ',err.message);
    }
  }

  const getRecipes=async(category="Beef")=>{
    try{
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      // console.log('got recipes',response.data) 
      if(response && response.data){
        setMeals(response.data.meals)
      }
    }
    catch(err){
      console.log('error: ',err.message);
    }
  }

  return (
    <View className="flex-1 bg-white">
      <StatusBar style='dark'/>
      <ScrollView 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom:50}}
      className="space-y-6 pt-14">
        {/* avatar and bell icon  */}
    <View className="mx-4 flex-row justify-between items-center mb-2">
      <Image source={require("../../assets/images/avatar.png")} style={{height:hp(5),width:hp(5.5)}}/>
      <Feather name="bell" size={24} color="gray" />
    </View>
    {/* greeting and punchline */}
    <View className="mx-4 space-y-2 mb-2">
      <Text style={{fontSize:hp(1.7)}} className="text-neutral-600"> Hello, Ibrahim!</Text>
      <View>
        <Text style={{fontSize:hp(3.8)}} className="font-semibold text-neutral-600">Make your own food,</Text>
      </View>
      <Text style={{fontSize:hp(3.8)}} >stay at <Text className="text-amber-400">home</Text></Text>
    </View>
    {/* searchBar */}
    <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px] ">
      <TextInput
      placeholder='Search any recipe'
      placeholderTextColor={"gray"}
      style={{fontSize:hp(1.7)}}
      className="flex-1 text-base mb-1 pl-3 tracking-wider"/>
      <View className="bg-white rounded-full p-3">
      <Feather name="search" size={hp(2.5)} color="gray"/>
      </View>
    </View>
    {/* catagories */}
    <View>
     {categories.length>0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory}/>}
    </View>
    {/* recipies */}
    <View>
      <Rescipes categories={categories} meals={meals}/>
    </View>
      </ScrollView>
      </View>
  )
}

export default HomeScreen