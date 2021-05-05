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
                <View style={styles.col}>
                <Ionicons
                        name={this.props.icon}
                        size={30}
                        color={this.props.bg == '#D93B4A' ? "#fff" : "red"}
                    />
                </View>
                <Text style={{...styles.title,color: this.props.title === 'Total Cases' ? '#FFF':'#b8b8aa' }}>{this.props.title}</Text>
                
                <Text styles={styles.title}>
                    {this.props.number}
                </Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        height: 130,
        width: 130,
        borderRadius: 30,
        padding: 15,
        marginLeft: 20
    },
    col: {
        flexDirection: "row"
    },
    title: {
        marginTop: 15,
        fontWeight: "bold",
        flexShrink: 12,
        marginBottom: 5
    }
})