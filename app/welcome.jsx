import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
//import {useFocusEffect} from "@react-navigation/native";

const WelcomeScreen = ({navigation}) => {
    const  fadeAnim = new Animated.Value(0);
    const scaleAnim = new Animated.Value(0.5);

    useEffect(() => {
        Animated.parallel(
            [
                Animated.timing(
                    fadeAnim, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    friction: 8,
                    tension: 40,
                    useNativeDriver: true,
                })
            ]).start();

        const timer = setTimeout(() => {
            navigation.replace('MainApp')
        },2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.content,
                    {
                        opacity: fadeAnim,
                        transform: [{scale: scaleAnim}],
                    },
                ]}
            >
                <Text style={styles.title}>Movie Tracker</Text>
                <Text style={styles.subtitle}>Track your movie journey</Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a2e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#e0e0e0',
    },
});

export default WelcomeScreen;