import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {POPULAR_MOVIES} from '../../services/ApiConstants';
import {RestAPIHandler, isResponseSuccess} from '../../services/RestApiHandler';
import {fonts} from '../../typography/fonts';
import {colors} from '../../typography/theme';
import {useNavigation} from '@react-navigation/native';

/**
 * Movies Component Which returns movies list
 */
const Movies = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const navigation = useNavigation();

  useEffect(() => {
    fetchMovies();
  }, [pageNum]);

  /**
   * This Async function is used to fetch movies list
   */
  const fetchMovies = async () => {
    setLoading(true);
    const requestObject = {
      method: 'GET',
      url: POPULAR_MOVIES,
      params: {
        page: pageNum,
      },
    };
    const response = await RestAPIHandler.invokeRESTApi(requestObject);

    if (isResponseSuccess(response)) {
      setLoading(false);
      const moviesList = [...movies, ...response.results];
      let newMovies = [];
      let uniqueMovie = {};
      for (let i in moviesList) {
        let movieId = moviesList[i]['id'];
        uniqueMovie[movieId] = moviesList[i];
      }
      for (i in uniqueMovie) {
        newMovies.push(uniqueMovie[i]);
      }
      setMovies(newMovies);
    }
  };

  /**
   * Rendering Movie Item
   */
  const renderMovieItem = item => {
    const IMAGE_URL = 'https://image.tmdb.org/t/p/w185' + item.poster_path;
    return (
      <TouchableOpacity
        style={styles.movieItemContainer}
        onPress={() => {
          navigation.navigate('movieDetails', {
            movieId: item.id.toString(),
          });
        }}>
        <View style={styles.movieItemView}>
          <Image
            source={{
              uri: IMAGE_URL,
            }}
            resizeMode="cover"
            style={styles.movieItemImage}
          />
          <View style={styles.movieItemDescriptionView}>
            <View>
              <Text style={styles.movieItemTitle}>{item.title}</Text>
              <View>
                <Text style={styles.movieItemDetailsText}>
                  {item.popularity}
                </Text>
                <Text style={[styles.movieItemDetailsText, {marginTop: 8}]}>
                  {item.release_date.slice(0, 4)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const footerView = () => {
    return loading && <ActivityIndicator size="large" />;
  };
  return (
    <View style={styles.container}>
      <View style={styles.popularMoviesTextContainer}>
        <Text style={styles.popularMoviesText}>Home</Text>
      </View>
      <View style={styles.flatListView}>
        <FlatList
          data={movies}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => renderMovieItem(item)}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.2}
          onEndReached={() => {
            setPageNum(pageNum + 1);
          }}
          ListFooterComponent={footerView}
        />
      </View>
    </View>
  );
};

export default Movies;
