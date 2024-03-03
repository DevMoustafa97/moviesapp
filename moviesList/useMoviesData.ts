// useMoviesData.ts
import { useEffect, useState } from 'react';
import { ApiResponse } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import NetInfo from '@react-native-community/netinfo'; // Import NetInfo

import { NativeModules } from 'react-native';

const { MoviesApp } = NativeModules;

const STORAGE_KEY = '@moviesData';

const useMoviesData = () => {
  const [moviesData, setMoviesData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isConnected, setIsConnected] = useState<boolean |  null>(true); // State to track internet connection status
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const data = await MoviesApp.getMovies();
      const parsedData = JSON.parse(data);
      setMoviesData(parsedData);
      
      // Cache the data
      await AsyncStorage.setItem(STORAGE_KEY, data);
    } catch (err:any) {
      setError(err);
      // If API request fails and no internet connection, set error message
      if (!isConnected) {
        setError(new Error('No internet connection'));
      } else {
        // Attempt to fetch from cache
        const cachedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (cachedData) {
          setMoviesData(JSON.parse(cachedData));
        }
      }
    }
  };

  const refreshData = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      if (state.isConnected) {
        refreshData();
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return { moviesData, error, refreshData, refreshing };
};

export default useMoviesData;
