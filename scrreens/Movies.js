import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import {
  Text,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
  useColorScheme,
  ScrollView,
  View,
  RefreshControl,
  FlatList,
} from "react-native";
import { makeImgPath } from "../utils";
import { BlurView } from "expo-blur";
import Slide from "../components/Slides";
import Poster from "../components/Poster";
import HMedia from "../components/HMedia";
import VMedia from "../components/VMedia";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { moviesApi } from "../api";
import Loader from "../components/Loader";

const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`;
const ListContainer = styled.View`
  margin-bottom: 40px;
`;
const HMovie = styled.View`
  padding: 0px 30px;
  margin-bottom: 30px;
  flex-direction: row;
`;
const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;
const Container = styled.ScrollView``;

const Movie = styled.View`
  margin-right: 30px;
  align-items: center;
`;
const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;
const Votes = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 10px;
`;
const Overview = styled.Text`
  color: white;
  opacity: 0.8;
  width: 80%;
`;
const Release = styled.Text`
  color: white;
  margin-vertical: 10px;
  font-size: 12px;
`;
const ListTitle = styled.Text`
  color: white;
  font-size: 15px;
  font-weight: 600;
  margin-left: 20px;
`;
const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`;
const VSeparator = styled.View`
  width: 20px;
`;
const HSeparator = styled.View`
  width: 20px;
`;
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies = () => {
  const [refreshing, setRefreshing] = useState(false);

  const queryClient = useQueryClient();
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    isRefetching: isRefetchingNowPlaying,
  } = useQuery(["movies", "nowPlaying"], moviesApi.nowPlaying);
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    isRefetching: isRefetchingUpcoming,
  } = useQuery(["movies", "upcoming"], moviesApi.upcoming);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: isRefetchingTrending,
  } = useQuery(["movies", "trending"], moviesApi.trending);
  const onRefresh = async () => {
    setRefreshing(true);
    await QueryClient.refetchQueries(["movies"]);
    setRefreshing(false);
  };

  // const renderVMedia = ({ item }) => {
  //   <VMedia
  //     posterPath={item.poster_path}
  //     originalTitle={item.original_title}
  //     voteAverage={item.vote_average}
  //   />;
  // };

  // const renderHmedia = ({ item }) => {
  //   <HMedia
  //     posterPath={item.poster_path}
  //     originalTitle={item.original_title}
  //     overview={item.overview}
  //     releaseDate={item.release_date}
  //   />;
  // };
  const movieKeyExtractor = (item) => item.id + "";
  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  // const refreshing =
  //   isRefetchingNowPlaying || isRefetchingUpcoming || isRefetchingTrending;

  return loading ? (
    <Loader />
  ) : (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            loop
            autoplay
            autoplayTimeout={3.5}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{
              marginBottom: 40,
              width: "100%",
              height: SCREEN_HEIGHT / 4,
            }}
          >
            {nowPlayingData?.results?.map((movie) => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path}
                posterPath={movie.poster_path}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
                fullData={movie}
              />
            ))}
          </Swiper>
          <ListContainer>
            <ListTitle>Trending Movies</ListTitle>
            <TrendingScroll
              data={trendingData?.results}
              horizontal
              keyExtractor={(item) => item.id + ""}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 30 }}
              ItemSeparatorComponent={VSeparator}
              renderItem={({ item }) => (
                <VMedia
                  fullData={item}
                  posterPath={item.poster_path}
                  originalTitle={item.original_title}
                  voteAverage={item.vote_average}
                />
              )}
            />
          </ListContainer>
          <ComingSoonTitle>Coming soon</ComingSoonTitle>
        </>
      }
      data={upcomingData?.results}
      keyExtractor={(item) => item.id + ""}
      ItemSeparatorComponent={HSeparator}
      renderItem={({ item }) => (
        <HMedia
          fullData={item}
          posterPath={item.poster_path}
          originalTitle={item.original_title}
          overview={item.overview}
          releaseDate={item.release_date}
        />
      )}
    />
  );
};
export default Movies;
