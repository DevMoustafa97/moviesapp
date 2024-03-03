import React, { useState, useCallback } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useMoviesData from './useMoviesData';
import { Movie } from './types';

const MovieList = () => {

  const { moviesData, refreshData, error, refreshing } = useMoviesData();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const onRefresh = useCallback(async () => {
    await refreshData();
  }, [refreshData]);

  const renderItem = useCallback(({ item }: { item: Movie }) => (
    <TouchableOpacity onPress={() => setSelectedMovie(item)}>
      <View style={styles.item}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  ), [setSelectedMovie, styles.item, styles.title]);

  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.error}>{error.message}</Text>
      ) : (
        <FlatList
          data={moviesData?.results}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
      {selectedMovie && (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>{selectedMovie.title}</Text>
          <Text style={styles.detailsOverview}>{selectedMovie.overview}</Text>
          <TouchableOpacity onPress={() => setSelectedMovie(null)}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  item: {
    backgroundColor: 'royalblue',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation:4,
    borderRadius:10
  },
  title: {
    color:"#FFF",
    fontSize: 18,
  },
  error: {
    fontSize: 18,
    textAlign: 'center',
    color: 'red',
  },
  detailsContainer: {
    backgroundColor: '#e6e6e6',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  detailsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsOverview: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default MovieList;
