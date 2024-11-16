/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export default function MainScreenComponent({ props }) {
    // function navigate() {
    //     props.navigation.navigate("Login")
    // }
    return (
        <View style={{ flex: 1, position: 'relative' }}>
            <View style={{ padding: 10, flexDirection: 'column' }}>

                <Text style={{ fontWeight: 'bold', fontSize: 30, fontFamily: 'ZillaSlab-Bold' }}>Welcomes to</Text>
                <Text style={{ fontWeight: 'bold', color: '#A06CD5', fontSize: 30 }}>Flora</Text>
                <Text style={{}}>
                    Flora is a blooming community hub where passionate florists
                    showcase their artistic creations. It's a haven for flower
                    lovers, providing a colorful gallery of floral wonders.
                    Users can explore, connect, and find inspiration, making
                    it the ultimate destination for all things floral.
                </Text>
                <TouchableOpacity
                    style={{
                        alignSelf: 'flex-start',
                        backgroundColor: '#A06CD5',
                        padding: 10,
                        borderRadius: 10,
                        marginTop: 10,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                    // onPress={() => navigate()}
                >
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Explore</Text>
                    <Image source={require('../../images/icons/rightArrow.png')} style={{ height: 16, width: 26, tintColor: '#fff' }} />
                </TouchableOpacity>
            </View>
            <Image source={require('../../images/bouquet.png')} style={{ position: 'absolute', bottom: 0, right: 0, height: 400, width: 400 }} />
        </View>
    );
}
