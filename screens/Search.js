import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, FlatList, TextInput, View,TouchableOpacity,Text,
    ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ItemRows from '../components/ItemRows';
import filter from 'lodash.filter';

export default function Search({navigation}) {

    const url = "https://api.covid19api.com/summary";
    const [data, setData] = useState();
    const [isLoading, setIsloading] = useState(false);
    const [error,setError] = useState();

    const [count, setCount] = useState([]);
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchCovidData = async () => {
            setIsloading(true);
            try {
                const result = await fetch(url);
                const response = await result.json();
                setData(response)
                //console.log('JSON',response.Countries)
                setCountries(response.Countries)
                setCount(response.Countries)
                
                setIsloading(false);
            }
            catch (e) {
                console.log(e)
                setIsloading(false);
                setError(e);
            }
        }
        fetchCovidData();
    }, []);
    
    if (isLoading) {
        return (
          <View style={{backgroundColor:"#fff", flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        );
      }

      if (error) {
        return (
          <View style={{ backgroundColor:"#fff",flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18}}>
              Error fetching data... Check your network connection!
            </Text>
          </View>
        );
      }

    const handleSearch = text => {
        if(text == 0){
            setCountries(count)
        }else{
            let filterArray = countries
            let searchResult = filterArray.filter(name => 
                
            name.Country.includes(text))
            setCountries(searchResult)
        }
    }

  return (
    <View style={styles.container}>
        <View style={styles.search}>
            <Ionicons onPress={() => navigation.navigate('Home')}
                name="arrow-back"
                size={25}
                style={styles.backIcon}
            />
            <TextInput 
            onChangeText={(queryText) => handleSearch(queryText)}
            keyboardType="default" 
            placeholderTextColor="#737373" 
            placeholder={"Search..."}
            style={styles.input} />
        </View>

        <View style={styles.flatList}>
                <FlatList showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.ID}
                    data={countries}
                    renderItem={({item})=> 
                    <TouchableOpacity 
                    activeOpacity={0.9} onPress={() => navigation.navigate('Detail', {paramCountry:item.Country,
                                                                                    paramCountryCode:item.CountryCode,
                                                                                    paramTotal:item.TotalConfirmed,
                                                                                    paramRecover:item.TotalRecovered,
                                                                                    paramDeath:item.TotalDeaths,
                                                                                    paramNewCa:item.NewConfirmed,
                                                                                    paramNewRe:item.NewRecovered,
                                                                                    paramNewDe:item.NewDeaths,
                        })}>
                     <ItemRows item={item} />
                    </TouchableOpacity> } 
                />
            </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    search: {
        width: '95%',
        height: 40,
        marginTop: 8,
        paddingRight: 7,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    backIcon: {
        alignSelf:"center",
        marginLeft: 10
    },
    input: {
        backgroundColor: '#cccccc',
        color: '#000',
        width: '85%',
        height: 35,
        alignSelf: 'center',
        fontWeight: 'bold',
        borderRadius: 5,
        paddingLeft: 10
    },
    flatList:{
        marginTop:10,
        width:'100%'
    }
});