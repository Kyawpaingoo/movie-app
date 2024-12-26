import {FlatList, Text, TouchableOpacity, View, Image, Modal, Button} from "react-native";
import styles from "./scripts.js";
import {movies} from "./movies";
import {useEffect, useState} from "react";

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
          <Text>Filter/Sort Options</Text>
      </View>
        <View style={styles.movieList}>
            <FlatList
                data={movies}
                renderItem={renderItem}
                keyExtractor={(item)=> item.id}

            />
        </View>

        {message ? (
                <View style={styles.footer}>
                    <Text style={styles.footerText}>{message}</Text>
                </View>
            ) : null}
    </View>
  );
}
