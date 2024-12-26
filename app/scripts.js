import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16
    },
    list: {
      padding: 16,
    },
    card: {
        flexDirection: 'row',
        marginBottom: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardInfo: {
        flex: 1,
        padding: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    year: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        fontSize: 14,
        color: '#f39c12',
        marginRight: 8,
    },
    contentContainer: {
        padding: 16,
    },
    duration: {
        fontSize: 14,
        color: '#666',
    },
    filterBar: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    movieList: {
        flex: 1,
        padding: 10,
    },
    poster: {
        width: 100,
        height: 150,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    statusContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 4,

    },
    statusOption: {
        paddingHorizontal: 0,
        paddingVertical: 2,
    },
    statusText: {
        color: '#666',
        padding: 10,
    },
    input_name: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        //height: 100,
        textAlignVertical: 'top',
    },
    input_note: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        height: 100,
        textAlignVertical: 'top',
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    genreContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 16,
    },
    genrePill: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        marginRight: 8,
        marginBottom: 8,
    },
    genreText: {
        color: '#666',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
    },
    addButton: {
        backgroundColor: '#1a1a2e',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    submitButton: {
        backgroundColor: '#1a1a2e',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 24,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    movieResultItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
    selectedMovieItem: {
        backgroundColor: '#e6f2ff',
        borderColor: '#007bff',
    },
    movieResultTitle: {
        marginRight: 5,
        fontWeight: 'bold',
    },
    movieResultYear: {
        color: '#666',
    },
    searchResultsContainer: {
        marginVertical: 10,
        maxHeight: 100,
    },
    movieInfo: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    }, statusSelected: {
        backgroundColor: '#007bff',
    },

    statusTextSelected: {
        color: 'white',
        backgroundColor: '#007bff',
        padding: 10,
    },

    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalText: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 20,
    },
    footer: { 
        padding: 10, 
        backgroundColor: '#1a1a2e', 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    footerText: { 
        color: '#fff', 
        fontSize: 16 
    },
    status: { fontSize: 14, marginTop: 5 },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    noDataText: { fontSize: 18, textAlign: 'center', marginTop: 20 },
    watchListItem: {
        flexDirection: 'row', // Content inside each item is horizontal
        backgroundColor: '#f8f8f8',
        paddingVertical: 0,
        paddingLeft: 0,   
        borderRadius: 5,
        height: 120,
        marginBottom: 10, // Separate items vertically
        alignItems: 'center',
    },
    watchListContainer: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16
    },
    watchListPoster: { width: 80, height: 80, marginRight: 10 },
    movieInfo: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default styles;