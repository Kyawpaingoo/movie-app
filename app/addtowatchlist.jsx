import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./scripts.js";
import {movies} from "./movies";
import {watchStatus} from "./movies";


export default function AddToWatchlist({route, navigation}) {
    const { movie } = route.params || {};
    const [status, setStatus] = useState('Want to Watch');
    const [notes, setNotes] = useState('');
    const [movieName, setMovieName] = useState(movie?.title || '');
    const [searchedMovies, setSearchedMovies] = useState(movie ? [movie] : []);
    const [selectedMovie, setSelectedMovie] = useState(movie || null);

    useEffect(() => {
        let timeoutId;
        if (movieName && movieName.length > 2) {
            timeoutId = setTimeout(() => {
                searchMovieByName(movieName);
            }, 300);
        } else if (!movieName) {
            setSearchedMovies([]);
            setSelectedMovie(null);
        }

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [movieName]);

    const searchMovieByName = (name) => {
        try {
            const foundMovies = movies.filter((movie) =>
                movie.title.toLowerCase().includes(name.toLowerCase())
            );

            setSearchedMovies(foundMovies);
            // Select first movie by default if results exist
            setSelectedMovie(foundMovies[0] || null);
        }
        catch(err){
            console.log(err);
            setSearchedMovies([]);
            setSelectedMovie(null);
        }
    };

    const handleMovieSelect = (movie) => {
        setSelectedMovie(movie);
    };

    const handleBack = () => {
       // console.log(route.params)
        if(route.params?.from == "TabNavigator") {
            navigation.navigate("Home", { successMessage: "Movie successfully added to your watchlist!" });
        }
        else if(route.params?.from == "StackNavigator") {
            navigation.navigate("MainApp", { successMessage: "Movie successfully added to your watchlist!" });
        }
        else {
            navigation.navigate("MainApp", { successMessage: "Movie successfully added to your watchlist!" });
        }
    }

    const handleSubmit = async () => {
        // Logic to add movie to watchlist
        try{
            const storedMovies = await AsyncStorage.getItem('watchlist');
            const movieList = storedMovies ? JSON.parse(storedMovies) : [];

            if(selectedMovie)
            {
                const isMovieList = movieList.some(movie => selectedMovie.title === movie.title);
                if(!isMovieList)
                {
                    const newMovieEntry = {
                        id: selectedMovie.id,
                        title: selectedMovie.title,
                        year: selectedMovie.year,
                        posterUrl: selectedMovie.posterUrl || '', // Optional field
                        status: status, // From form input
                        note: notes,    // From form input
                    };

                    movieList.push(newMovieEntry);
                }
            }
            await AsyncStorage.setItem('watchlist', JSON.stringify(movieList));
            handleBack();

        } catch (e) {
            console.log("Error saving movie list:",e);
        }

    }

    const renderMovieItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.movieResultItem,
                selectedMovie?.title === item.title && styles.selectedMovieItem
            ]}
            onPress={() => handleMovieSelect(item)}
        >
            <Text style={styles.movieResultTitle}>{item.title}</Text>
            <Text style={styles.movieResultYear}>({item.year})</Text>
        </TouchableOpacity>
    );

    return(
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={handleBack}
                >
                   <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Add to Watchlist</Text>
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>Movie Name</Text>
                <TextInput
                    style={styles.input_name}
                    multiline={false}
                    numberOfLines={1}
                    placeholder="Enter movie name..."
                    value={movieName}
                    onChangeText={setMovieName}
                />

                {searchedMovies.length > 0 && (
                    <View style={styles.searchResultsContainer}>
                        <FlatList
                            data={searchedMovies}
                            renderItem={renderMovieItem}
                            keyExtractor={(item) => item.title}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                )}

                {selectedMovie && (
                    <View style={styles.movieInfo}>
                        <Text style={styles.label}>Movie Details</Text>
                        <Text>Title: {selectedMovie.title}</Text>
                        <Text>Year: {selectedMovie.year}</Text>
                        <Text>Director: {selectedMovie.director}</Text>
                    </View>
                )}

                <Text style={styles.label}>Watch Status</Text>
                <View style={styles.statusContainer}>

                    {watchStatus.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={[
                                styles.statusOption,
                                status === item.label && styles.statusSelected,
                            ]}
                            onPress={() => setStatus(item.label)}
                        >
                            <Text style={[
                                styles.statusText,
                                status === item.label && styles.statusTextSelected,
                            ]}>
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.label}>Notes</Text>
                <TextInput
                    style={styles.input_note}
                    multiline={true}
                    numberOfLines={2}
                    placeholder="Add your thoughts about this movie..."
                    value={notes}
                    onChangeText={setNotes}
                />

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Add to Watchlist</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}