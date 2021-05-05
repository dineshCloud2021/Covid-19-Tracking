import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { color } from 'react-native-reanimated';


const ItemRows = ({ item }) => {

    const createTwoButtonAlert = () =>
    Alert.alert(
      "Alert Title"
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

    return (
        <View style={styles.rows}>
            <TouchableOpacity >
            
               <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around'
            }}>
                <View>
                    <Image
                        source={{
                            uri: `https://www.countryflags.io/${item.CountryCode}/flat/64.png`
                        }}
                        style={styles.flag}
                    />
                </View>
                <View style={{marginTop: 5 }}>
                    <Text style={styles.countryName}>{item.Country}</Text>
                </View>
                <View style={{alignItems:'center'}}>
                    <Text style={styles.totalCasesName}>TotalConfirmed</Text>
                    <Text style={{...styles.totalCases,color:'#D93B4A'}}>{item.TotalConfirmed}</Text>
                </View>
            </View>
        
            </TouchableOpacity>
             </View>
    );
}

const styles = StyleSheet.create({
    rows: {
        width: '100%',
        marginTop: 10,
        marginBottom: 8,
        padding: 10
    },
    countryName: {
        fontSize: 15,
        color:'#fff',
        fontWeight: 'bold'
    },
    totalCasesName: {
        fontSize: 12,
        color:'#b8b8aa',
        fontWeight: 'bold',
        marginTop: 5
    },
    totalCases: {
        fontSize: 10,
        color:'#b8b8aa',
        fontWeight: 'bold',
        marginTop: 5
    },
    flag: {
        height: 30,
        width: 40,
        padding: 10, 
        borderRadius: 15
    }
});

export default ItemRows;