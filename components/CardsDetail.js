import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import Icon from 'react-native-ionicons';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Cards extends Component {
    render() {
        return (
            <View style={{
                ...styles.container,
                backgroundColor: this.props.bg,
                marginRight: this.props.title === 'Deaths' ? 20:0,
            }}>
                <View style={
                            [styles.line,this.props.title === 'Total Cases' ? styles.totalLine :
                                this.props.title === 'Recovered' ? styles.recoverLine :
                                styles.deathLine]
                            }>
                    <Text></Text>
                </View>

                <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            padding:10}}>
                    <Ionicons
                        name={this.props.icon}
                        size={30}
                        style={
                            [styles.icon,this.props.title === 'Total Cases' ? styles.totalNum :
                                this.props.title === 'Recovered' ? styles.recoverNum :
                                styles.deathNum]
                            }
                    />
                
                    <Text style={{...styles.title}}>{this.props.title}</Text>
                
                    <Text style={
                        [styles.number,this.props.title === 'Total Cases' ? styles.totalNum :
                            this.props.title === 'Recovered' ? styles.recoverNum :
                            styles.deathNum]
                        }>
                        +{this.props.number}
                    </Text>
                </View>
                

            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        height: 85,
        width: '80%',
        borderRadius: 30,
        elevation: 5,
        overflow:'hidden',
        alignSelf: "center",
        margin: 10
    },
    line: {
        width: '100%',
        height: 10
    },
    totalLine: {
        backgroundColor: '#ff3333'
    },
    recoverLine: {
        backgroundColor: "#2ac100"
    },
    deathLine: {
        backgroundColor: '#ff721d'
    },
    icon: {
        marginTop:8
    },
    title: {
        marginTop: 20,
        fontWeight: "bold",
        fontSize: 10
    },
    number: {
        marginTop: 15,
        fontWeight: "bold",
        fontSize: 15,
    },
    totalNum: {
        color: '#ff3333'
    },
    recoverNum: {
        color: "#2ac100"
    },
    deathNum: {
        color: '#ff721d'
    },
})
