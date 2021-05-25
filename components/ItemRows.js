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

    function thousands_separators(num)
      {
        var num_parts = num.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return num_parts.join(".");
      }

    return (
        <View style={styles.rows}>
            
               <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around'}}>
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
                    <Text style={styles.totalCasesName}>Confirmed</Text>
                    <Text style={{...styles.totalCases,color:'#D93B4A'}}>+ {thousands_separators(item.TotalConfirmed)}</Text>
                </View>
            </View>
        
            </View>
    );
}

const styles = StyleSheet.create({
    rows: {
        width: '90%',
        marginTop: 10,
        marginBottom: 8,
        padding: 10,
        backgroundColor:"#ffb3b3",
        alignSelf: "center",
        borderRadius: 8,
        elevation: 5,
    },
    countryName: {
        fontSize: 15,
        color:'#000',
        fontWeight: 'bold'
    },
    totalCasesName: {
        fontSize: 10,
        color:'#404040',
        marginTop: 5
    },
    totalCases: {
        fontSize: 10,
        fontWeight: 'bold',
        marginTop: 5
    },
    flag: {
        height: 30,
        width: 40,
        padding: 10, 
        borderRadius: 5
    }
});

export default ItemRows;