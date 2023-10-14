import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {API_KEY, BASE_URL, MOVIE_DETAILS} from '../../services/ApiConstants';
import {RestAPIHandler, isResponseSuccess} from '../../services/RestApiHandler';
import Header from '../../components/header/Header';
import {useNavigation} from '@react-navigation/native';

/**
 * This JSX is used for Movie Details
 * @param {*} route contains params 
 * @returns Movie Details Component
 */
const MovieDetails = ({route}) => {
  const [loading, setLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState({});
  const navigation = useNavigation();

  const {movieId} = route.params;
  console.log('Movie Id', movieId);
  useEffect(() => {
    fetchMovieDetails();
  }, []);

  const fetchMovieDetails = async () => {
    const requestObject = {
      method: 'GET',
      url: BASE_URL + movieId,
      params: {
        api_key: API_KEY,
      },
    };
    const response = await RestAPIHandler.invokeRESTApi(requestObject);
    console.log('Response--', response);
    if (isResponseSuccess(response)) {
      setLoading(false);
    }
  };
  return (
    <View>
      <Header
        headerTitle={'Movie Details'}
        callBack={() => navigation.goBack()}
      />
    </View>
  );
};

export default MovieDetails;
