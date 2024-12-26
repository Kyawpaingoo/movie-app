import {View, Text, Image, FlatList} from "react-native";
import styles from "./scripts";
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WatchList(){

    const [watchList, setWathList] = useState([]);

    useEffect(() => {
        const fetchWatchList = async () => {
            try {
                const storedMovies = await AsyncStorage.getItem('watchlist');
                const movieList = storedMovies ? JSON.parse(storedMovies) : [];
                if (watchList) {
                    setWathList(movieList);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchWatchList();
    }, []);

    const renderItem = ({item}) => (
        <View style={styles.watchListItem}>
            <Image
                style={styles.watchListPoster}
                source={{uri: item.posterUrl}}
                resizeMode="cover"
            />
            <View style={styles.movieInfo}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.year}>{item.year}</Text>
                <Text style={styles.status}>{item.status}</Text>
            </View>
        </View>
    )

    return (
        <View style={styles.watchListContainer}>
            <Text  style={styles.header}>My Moive Watchlist</Text>
            {
                watchList.length > 0 ? (
                    <FlatList
                        data={watchList}
                        renderItem={renderItem}
                        key={item => item.id}
                        keyExtractor={(item) => item.id}
                    />
                ) : (
                    <Text style={styles.noDataText}>No movies in watchlist</Text>
                )
            }
        </View>
    )
}