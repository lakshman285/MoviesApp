import {View, Text, Image, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {API_KEY, BASE_URL} from '../../services/ApiConstants';
import {RestAPIHandler, isResponseSuccess} from '../../services/RestApiHandler';
import Header from '../../components/header/Header';
import {useNavigation} from '@react-navigation/native';
import Utils from '../../Utils/AppUtils';
import {ScrollView} from 'react-native-gesture-handler';
import {colors} from '../../typography/theme';
import styles from './styles';
import {Linking} from 'react-native';

/**
 * This JSX is used for Movie Details
 * @param route contains params
 * @returns Movie Details Component
 */
const MovieDetails = ({route}) => {
  const [loading, setLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState({});
  const navigation = useNavigation();

  const {movieId} = route.params;
  useEffect(() => {
    fetchMovieDetails();
  }, []);

  const fetchMovieDetails = async () => {
    setLoading(true);
    const requestObject = {
      method: 'GET',
      url: BASE_URL + movieId,
      params: {
        api_key: API_KEY,
      },
    };
    const response = await RestAPIHandler.invokeRESTApi(requestObject);
    if (isResponseSuccess(response)) {
      setLoading(false);
      setMovieDetails(response);
    }
  };
  return (
    <View>
      <Header
        headerTitle={'Movie Details'}
        callBack={() => navigation.goBack()}
      />
      {loading ? (
        <View style={styles.indicatorView}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        !Utils.isEmpty(movieDetails) && (
          <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.movieDetailsView}>
              {!Utils.isEmpty(movieDetails.backdrop_path) && (
                <Image
                  source={{
                    uri:
                      'https://image.tmdb.org/t/p/w185' +
                      movieDetails.backdrop_path,
                  }}
                  resizeMode="stretch"
                  style={styles.movieItemImage}
                />
              )}
              <Text style={styles.movieItemDetailsText}>Title:</Text>
              <Text style={styles.movieItemTitle}>{movieDetails.title}</Text>
              <Text style={styles.movieItemDetailsText}>Genre:</Text>
              {!Utils.isEmpty(movieDetails.genres) &&
                movieDetails.genres.map((item, key) => {
                  return <Text>{item.name}</Text>;
                })}
              <Text style={styles.movieItemDetailsText}>
                Popularity:
                <Text style={styles.movieDetailsDescriptionText}>
                  {'  '}
                  {movieDetails.popularity}
                </Text>
              </Text>
              <Text style={styles.movieItemDetailsText}>
                Release Year:
                <Text style={styles.movieDetailsDescriptionText}>
                  {'  '}
                  {movieDetails.release_date.slice(0, 4)}
                </Text>
              </Text>
              <Text style={styles.movieItemDetailsText}>
                Overview:
                <Text style={styles.movieDetailsDescriptionText}>
                  {'  '}
                  {movieDetails.overview}
                </Text>
              </Text>
              <Text style={styles.movieItemDetailsText}>
                Run Time:
                <Text style={styles.movieDetailsDescriptionText}>
                  {'  '}
                  {movieDetails.runtime}
                </Text>
              </Text>
              <Text style={styles.movieItemDetailsText}>
                Homepage:
                <Text
                  style={[styles.movieDetailsDescriptionText]}
                  onPress={() => Linking.openURL(movieDetails.homepage)}>
                  {'  '}
                  {movieDetails.homepage}
                </Text>
              </Text>
            </View>
          </ScrollView>
        )
      )}
    </View>
  );
};

export default MovieDetails;
