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
                marginRight: this.props.title === 'New Deaths' ? 20:0,
            }}>
                <View  style={
                            [styles.line,this.props.title === 'New Cases' ? styles.totalLine :
                                this.props.title === 'New Recovered' ? styles.recoverLine :
                                styles.deathLine]
                            }>
                    <Text></Text>
                </View>

                <View style={{padding:10}}>
                    <Text style={{...styles.title}}>{this.props.title}</Text>
                
                    <Text style={
                        [styles.number,this.props.title === 'New Cases' ? styles.totalNum :
                            this.props.title === 'New Recovered' ? styles.recoverNum :
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
        height: 80,
        width: 130,
        borderRadius: 30,
        marginLeft: 20,
        elevation: 5,
        margin:10,
        overflow:'hidden'
    },
    line: {
        width: '100%',
        height: 12
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
    title: {
        marginTop: 0,
        fontWeight: "bold",
        fontSize: 10
    },
    number: {
        marginTop: 5,
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
