import React, { Component, useEffect, useState } from 'react';
import {View,Text,StyleSheet,Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Cards from '../components/CardsDetail';
import CardsNew from '../components/CardsNewDetail';
import ItemRows from '../components/ItemRows';

export default function Detail({route,navigation}) {

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

    today = dd+ '-' +mm+ '-' + yyyy;

    return (
        <View style={styles.container}>

            <ScrollView>

                <View style={{
                flexDirection: 'row',
                marginTop: 40,
                marginRight:30,
                marginLeft:30,
                justifyContent: 'center'}}>
                    <Image
                        source={{
                            uri: `https://www.countryflags.io/${route.params.paramCountryCode}/flat/64.png`
                        }}
                        style={styles.flag}
                    />
                    <Text style={{...styles.covidHeading,}}>{route.params.paramCountry}</Text>
                </View>

                

                <View style={{alignItems:'center'}}>
                        <Text style={styles.casesHeading}> Till Date <Text style={{color:'#D93B4A',textDecorationLine: "underline"}}>Covid-19</Text> Cases</Text>
                </View>

                <View style={styles.cards}>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        style={{ marginTop: 150 }}
                    >
                        <Cards
                            icon="pulse"
                            title="Total Cases"
                            bg="#FFF"
                            number={route.params.paramTotal}
                        />

                        <Cards
                            icon="medkit"
                            title="Recovered"
                            bg="#FFF"
                            number={route.params.paramRecover}
                        />

                        <Cards
                            icon="heart-dislike-sharp"
                            title="Deaths  "
                            bg="#FFF"
                            number={route.params.paramDeath}
                        />
                    </ScrollView>
                </View>

                <View style={{alignItems:'center'}}>
                        <Text style={styles.casesHeading}>Today (<Text style={{color:'#D93B4A',textDecorationLine: "underline"}}>{today}</Text>) Cases</Text>
                </View>

                <View style={styles.cardsNew}>
                    <ScrollView
                       
                        style={{ marginTop: 150 }}
                    >

                        <ScrollView
                         horizontal
                         showsHorizontalScrollIndicator={false}>

                            <CardsNew
                            icon="pulse"
                            title="New Cases"
                            bg="#FFF"
                            number={route.params.paramNewCa}
                        />

                        <CardsNew
                            icon="medkit"
                            title="New Recovered"
                            bg="#FFF"
                            number={route.params.paramNewRe}
                        />


                        </ScrollView>
    
                        <CardsNew
                            icon="nuclear"
                            title="New Deaths"
                            bg="#FFF"
                            number={route.params.paramNewDe}
                        />

                    </ScrollView>

                </View>
            </ScrollView>
        
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    covidHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        color:'#D93B4A',
        textDecorationLine: "underline",
        textTransform: "uppercase"
    },
    cards: {
        marginTop: -130,
    },
    cardsNew: {
        marginTop: -130,
        alignSelf:"center"
    },
    casesHeading:{
        color: '#000',
        fontSize: 15,
        alignSelf: 'center',
        fontWeight: 'bold',
        marginTop: 20
    },
    flatList:{
        marginTop:10
    },
    flag: {
        height: 30,
        width: 40,
        padding: 10, 
        borderRadius: 1,
        marginRight:5
    }
})