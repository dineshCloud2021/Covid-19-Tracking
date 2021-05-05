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
                <View style={styles.col}>
                </View>
                <View style={{alignItems:'center'}}>
                    <Text style={{...styles.title,
                        color: this.props.title === 'New  Cases' ? '#FFF':'#b8b8aa' }}>
                            {this.props.title}
                    </Text>
                
                    <Text styles={styles.title}>
                        {this.props.number}
                    </Text>
                </View>
                
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        borderRadius: 30,
        padding: 15,
        marginLeft: 20
    },
    col: {
        flexDirection: "row"
    },
    title: {
        fontWeight: "bold",
        flexShrink: 12,
        marginBottom: 5
    }
})