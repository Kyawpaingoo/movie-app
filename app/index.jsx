import {FlatList, Text, TouchableOpacity, View, Image, Modal, Button} from "react-native";
import styles from "./scripts.js";
import {movies} from "./movies";
import {useEffect, useState} from "react";
import { sortOptions } from "./movies";
import SearchBar from "./searchbar";
import SortPicker from "./sortpicker";

const MovieCard = ({movie, onPress})=> (
    <TouchableOpacity style={styles.card} onPress={onPress}>
        <Image
            style={styles.poster}
            source={{ uri: movie.posterUrl }}
            resizeMode="cover"
        />
            <View style={styles.cardInfo}>
                <Text style={styles.title}>{movie.title}</Text>
                <Text style={styles.year}>{movie.year}</Text>
                <View style={styles.ratingContainer}>
                    <Text style={styles.rating}>★ {movie.rating}</Text>
                    <Text style={styles.duration}>{movie.duration}</Text>
                </View>
            </View>
    </TouchableOpacity>
);

export default function Index({navigation, route}) {
    const [message, setMessage] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSortOption, setSelectedSortOption] = useState(sortOptions[0].id);
    const [filteredMovies, setFilteredMovies] = useState(movies);
  
    useEffect(() => {
        if(route.params?.successMessage) {
           
            setMessage(route.params.successMessage);
            setModalVisible(true);

            const timer = setTimeout(() => {
                setModalVisible(false);
                setMessage(null);
            }, 3000);   

            return () => clearTimeout(timer);
        }
    }, [route.params?.successMessage]);

    useEffect(() => {
        filterAndSortMovies();
      }, [searchQuery, selectedSortOption]);
    
      const filterAndSortMovies = () => {
        let filtered = movies.filter(movie =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    
        switch (selectedSortOption) {
          case 'title':
            filtered.sort((a, b) => a.title.localeCompare(b.title));
            break;
          case 'title-desc':
            filtered.sort((a, b) => b.title.localeCompare(a.title));
            break;
          case 'year':
            filtered.sort((a, b) => b.year - a.year);
            break;
          case 'year-desc':
            filtered.sort((a, b) => a.year - b.year);
            break;
          case 'rating':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
          case 'rating-desc':
            filtered.sort((a, b) => a.rating - b.rating);
            break;
          default:
            break;
        }
    
        setFilteredMovies(filtered);
      };

    const renderItem = ({item}) => (
        <MovieCard
            movie={item}
            onPress={()=> navigation.navigate("MovieDetail", {movie: item})}
        />
    )

  return (
    <View
      style={styles.container}
    >
       <View style={styles.filterBar}>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <SortPicker
          selectedSortOption={selectedSortOption}
          setSelectedSortOption={setSelectedSortOption}
          sortOptions={sortOptions}
        />
      </View>
        <View style={styles.movieList}>
            <FlatList
                data={movies}
                renderItem={renderItem}
                keyExtractor={(item)=> item.id}

            />
        </View>

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>{message}</Text>
                </View>
            </View>
        </Modal>
    </View>
  );
}
