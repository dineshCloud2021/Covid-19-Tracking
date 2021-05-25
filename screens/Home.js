import React, { Component, useEffect, useState } from 'react';
import {View,Text,StyleSheet,FlatList, Button, TouchableOpacity,
    ActivityIndicator} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Cards from '../components/Cards';
import CardsNew from '../components/CardsNew';
import ItemRows from '../components/ItemRows';
import { Ionicons } from '@expo/vector-icons';


export default function Home({navigation}) {

    const [verified, setVerified] = useState(false);

    setInterval(() => {
        setVerified(true)
      }, 2000);

    const url = "https://api.covid19api.com/summary";
    const [data, setData] = useState();
    const [isLoading, setIsloading] = useState(false);
    const [error,setError] = useState();
    useEffect(() => {
        const fetchCovidData = async () => {
            setIsloading(true);
            try {
                const result = await fetch(url);
                const response = await result.json();
                setData(response)
                setIsloading(false);
            }
            catch (e) {
                console.log(e)
            }
        }
        fetchCovidData();
    }, []);

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today =  dd+ '-' +mm+ '-' + yyyy;

    if (verified == false) {
        return (
          <View style={{backgroundColor:"#fff", flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{fontSize: 25,
                            alignSelf:"center",
                            marginTop:20,
                            marginLeft:20,
                            marginRight:20,
                            color:"#D93B4A",
                            fontWeight:"bold"}}>
              Covid 19
            </Text>
            <Text style={{fontSize: 15,
                            alignSelf:"center",
                            margin:0,
                            color:"#000",
                            fontWeight:"bold"}}>Tracking</Text>
          </View>
        );
      }

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

      function thousands_separators(num)
      {
        var num_parts = num.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return num_parts.join(".");
      }

    return (
        <View style={styles.container}>
            <Text style={styles.covidHeading}>
                <Text style={{color:'#D93B4A',textDecorationLine: "underline"}}>COVID-19</Text> DASHBOARD</Text>

            <View style={{alignItems:'center',marginTop:10}}>
                    <Text style={styles.casesHeading}>Globally <Text style={{color:'#D93B4A',textDecorationLine: "underline"}}>Covid-19</Text> Cases</Text>
            </View>

            <View style={styles.cards}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ marginTop: 150 }}
                >
                    <Cards
                        icon="pulse"
                        title="Total Cases"
                        bg="#FFF"
                        number={data ? thousands_separators(data.Global.TotalConfirmed)  : 0}
                    />

                    <Cards
                        icon="medkit"
                        title="Recovered"
                        bg="#FFF"
                        number={data ? thousands_separators(data.Global.TotalRecovered) : 0}
                    />

                    <Cards
                        icon="heart-dislike-sharp"
                        title="Deaths"
                        bg="#FFF"
                        number={data ? thousands_separators(data.Global.TotalDeaths) : 0}
                    />
                </ScrollView>
            </View>

            <View style={{alignItems:'center'}}>
                    <Text style={styles.casesHeading}>Today (<Text style={{color:'#D93B4A',textDecorationLine: "underline"}}>{today}</Text>) Cases</Text>
            </View>

            <View style={styles.cardsNew}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ marginTop: 150 }}
                >
                    <CardsNew
                        icon="pulse"
                        title="New Cases"
                        bg="#FFF"
                        number={data ? thousands_separators(data.Global.NewConfirmed) : 0}
                    />

                    <CardsNew
                        icon="medkit"
                        title="New Recovered"
                        bg="#FFF"
                        number={data ? thousands_separators(data.Global.NewRecovered) : 0}
                    />

                    <CardsNew
                        icon="nuclear"
                        title="New Deaths"
                        bg="#FFF"
                        number={data ? thousands_separators(data.Global.NewDeaths) : 0}
                    />
                </ScrollView>
            </View>
            
            <View style={{flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,marginLeft:18,marginRight:18}}>
                <Text onPress={() => navigation.navigate('Detail')} style={styles.casesHeading}><Text style={{color:'#D93B4A',textDecorationLine: "underline"}}>Covid-19</Text> Cases by Region</Text>
                    
                <View>
                    <TouchableOpacity style={styles.search} onPress={() => navigation.navigate('Search')}>
                         <Ionicons
                        name="search-sharp"
                        size={15}
                        style={{marginRight:5}}
                    />
                    <Text style={{fontSize:12,fontWeight:"bold"}}>Search</Text>
                    </TouchableOpacity>
                </View>
                    
            </View>
            
            <View style={styles.flatList}>
                <FlatList
                    data={data && data.Countries ?  data.Countries : 0}
                    keyExtractor={item => item.ID}
                    renderItem={({item})=> 
                    <TouchableOpacity
                    activeOpacity={0.9}
                     onPress={() => navigation.navigate('Detail', {paramCountry:item.Country,
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
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    covidHeading: {
        color: '#000',
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: 'bold',
        marginTop: 10
    },
    cards: {
        marginTop: -130,
    },
    cardsNew: {
        marginTop: -130,
    },
    casesHeading:{
        color: '#000',
        fontSize: 15,
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    flatList:{
        marginTop:10
    },
    search: {
        backgroundColor: '#cccccc',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 7,
        flexDirection: 'row',
        alignItems:'center',
        borderRadius: 15
    }
})