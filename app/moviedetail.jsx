import {View, Text, Image, ScrollView, Button, TouchableOpacity} from "react-native";
import styles from "./scripts.js";
export default function MovieDetail({route, navigation}) {
    const {movie} = route.params;

    return(
        <View style={styles.container}>
            <Button title="Back" onPress={() => navigation.goBack()} />
            <ScrollView style={styles.container}>
                <Image
                    style={styles.poster}
                    source={{ uri: movie.posterUrl}}
                    resizeMode="cover"
                />
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>{movie.title}</Text>

                    <View style={styles.infoRow}>
                        <Text style={styles.year}>{movie.year}</Text>
                        <Text style={styles.duration}>{movie.duration}</Text>
                        <Text style={styles.rating}>* {movie.rating}</Text>
                    </View>

                    <View style={styles.genreContainer}>
                        {
                            movie.genre.map(
                                (genre, index) => (
                                <View key={index} style={styles.genrePill}>
                                    <Text style={styles.genreText}>{genre}</Text>
                                </View>
                            ))
                        }
                    </View>

                    <Text style={styles.sectionTitle}>Overview</Text>
                    <Text style={styles.description}>{movie.description}</Text>
                    <Text style={styles.sectionTitle}>Cast</Text>
                    <Text style={styles.cast}>{movie.cast.join(', ')}</Text>

                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={
                        () =>
                            navigation.navigate('AddToWatchList', { movie })

                    }
                    >
                        <Text style={styles.addButtonText}>Add to Watchlist</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}