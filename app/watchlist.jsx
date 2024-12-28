import {View, Text, Image, FlatList, ActivityIndicator, TouchableOpacity, Modal} from "react-native";
import {Picker} from "@react-native-picker/picker";
import styles from "./scripts";
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {watchStatus} from "./movies";

export default function WatchList(){
    const [watchList, setWatchList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [newStatus, setNewStatus] = useState('');

    useEffect(() => {
        const fetchWatchList = async () => {
            try {
                const storedMovies = await AsyncStorage.getItem('watchlist');
                const movieList = storedMovies ? JSON.parse(storedMovies) : [];

               const updatedMovieList = movieList.map((movie, index) => ({
                    ...movie,
                    id: movie.id || index.toString(), // Assign index as id if id is missing
                }));
                setWatchList(updatedMovieList);
            } catch (err) {
                setError("Failed to load watchlist. Please try again later.");
                console.log(err);
            } finally {
                setLoading(false);
                
            }
        };
        fetchWatchList();
        
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Want to Watch':
                return '#F08080'; 
            case 'Currently Watching':
                return '#1E90FF'; 
            case 'Completed':
                return '#3CB371';
            default:
                return '#000'; // Default to black
        }
    };

    const handleStatusChange = async (movie) => {
        setSelectedMovie(movie);
        setNewStatus(movie.status);
        setModalVisible(true);
    };

    const saveStatusChange = async () => {
        if (selectedMovie) {
            const updatedWatchList = watchList.map((movie) =>
                movie.id === selectedMovie.id ? { ...movie, status: newStatus } : movie
            );

            setWatchList(updatedWatchList);
            await AsyncStorage.setItem('watchlist', JSON.stringify(updatedWatchList));
            setModalVisible(false);
        }
    }

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
                <Text style={[styles.status, { backgroundColor: getStatusColor(item.status) }]}>{item.status}</Text>
                <TouchableOpacity
                    onPress={() => handleStatusChange(item)}
                    style={styles.changeStatusButton}
                >
                    <Text style={styles.changeStatusButtonText}>Change Status</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#1a1a2e" />
            </View>
        )
    }

    if(error)
    {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <Text  style={styles.header}>My Moive Watchlist</Text>
            {
                
                watchList.length > 0 ? (
                    <FlatList
                        data={watchList}
                        renderItem={renderItem}
                        keyExtractor={(item) => parseInt(item.id)}
                    />
                ) : (
                    <Text style={styles.noDataText}>No movies in watchlist</Text>
                )
            }

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Update Status</Text>
                        <Picker
                            selectedValue={newStatus}
                            style={{ height: 50, width: 250 }}
                            onValueChange={(itemValue) => setNewStatus(itemValue)}
                        >
                            {watchStatus.map((status, index) => (
                                <Picker.Item key={index} label={status.label} value={status.label} />
                            ))}
                        </Picker>
                        <TouchableOpacity style={styles.saveButton} onPress={saveStatusChange}>
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}