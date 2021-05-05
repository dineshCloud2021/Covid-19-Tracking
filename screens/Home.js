import React, { Component, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ImageBackground,
    FlatList
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Cards from '../components/Cards';
import CardsNew from '../components/CardsNew';
import ItemRows from '../components/ItemRows';
const Home = () => {


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

    today = mm + '-' + dd + '-' + yyyy;


    return (
        <View style={styles.container}>
            <Text style={styles.covidHeading}><Text style={{color:'#D93B4A',textDecorationLine: "underline"}}>COVID-19</Text> DASHBOARD</Text>

            <View style={{alignItems:'center'}}>
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
                        bg="#D93B4A"
                        number={data ? data.Global.TotalConfirmed : 0}
                    />

                    <Cards
                        icon="medkit"
                        title="Recovered"
                        bg="#FFF"
                        number={data ? data.Global.TotalRecovered : 0}
                    />

                    <Cards
                        icon="nuclear"
                        title="Deaths"
                        bg="#FFF"
                        number={data ? data.Global.TotalDeaths : 0}
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
                        title="New  Cases"
                        bg="#D93B4A"
                        number={data ? data.Global.NewConfirmed : 0}
                    />

                    <CardsNew
                        icon="medkit"
                        title="New Recovered"
                        bg="#FFF"
                        number={data ? data.Global.NewRecovered : 0}
                    />

                    <CardsNew
                        icon="nuclear"
                        title="New Deaths"
                        bg="#FFF"
                        number={data ? data.Global.NewDeaths : 0}
                    />
                </ScrollView>
            </View>
            
            <View style={{alignItems:'center'}}>
                    <Text style={styles.casesHeading}><Text style={{color:'#D93B4A',textDecorationLine: "underline"}}>Covid-19</Text> Cases by Region</Text>
            </View>
            
            <View style={styles.flatList}>
                <FlatList 
                    data={data && data.Countries ?  data.Countries : 0}
                    renderItem={({item})=> <ItemRows item={item}/>} 
                />
            </View>
        
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1c2732'
    },
    covidHeading: {
        color: '#FFF',
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: 'bold',
        marginTop: 20
    },
    cards: {
        marginTop: -130,
    },
    cardsNew: {
        marginTop: -130,
    },
    casesHeading:{
        color: '#FFF',
        fontSize: 15,
        alignSelf: 'center',
        fontWeight: 'bold',
        marginTop: 15
    },
    flatList:{
        marginTop:10
    }
})

export default Home;