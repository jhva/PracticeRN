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
} from "react-native";
import { makeImgPath } from "../utils";
import { BlurView } from "expo-blur";
import Slide from "../components/Slides";
import Poster from "../components/Poster";

const TrendingScroll = styled.ScrollView`
  margin-top: 20px;
`;
const Container = styled.ScrollView``;
const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
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

const API_KEY = "7a16f91146840c4d3a87f8a771f9239a";
const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const ListTitle = styled.Text`
  color: white;
  font-size: 15px;
  font-weight: 600;
  margin-left: 20px;
`;
const Movies = () => {
  const [loading, setLoading] = useState(true);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await Promise.all([getTrending(), getUpcomming(), getNowPlaying()]);
    setLoading(false);
  };
  const getTrending = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
      )
    ).json();
    setTrending(results);
  };
  const getUpcomming = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/upcomming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
      )
    ).json();
    setUpcoming(results);
  };
  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
      )
    ).json();
    setNowPlayingMovies(results);

    console.log(results, "ee");
  };

  return loading ? (
    <Loader>
      <ActivityIndicator size="small" />
    </Loader>
  ) : (
    <Container>
      <Swiper
        horizontal
        loop
        autoplayTimeout={3.5}
        showsButtons={false}
        autoplay
        timeout={3.5}
        showsPagination={false}
        controlsEnabled={false}
        containerStyle={{
          marginBottom: 15,
          width: "100%",
          height: SCREEN_HEIGHT / 4,
        }}
      >
        {/* <View style={{ backgroundColor: "red" }}></View>
        <View style={{ backgroundColor: "blue" }}></View>
        <View style={{ backgroundColor: "red" }}></View>
        <View style={{ backgroundColor: "blue" }}></View> */}
        {nowPlayingMovies.map((movie) => (
          <Slide
            key={movie.id}
            backdrop_path={movie.backdrop_path}
            poster_path={movie.poster_path}
            original_title={movie.original_title}
            overview={movie.overview}
            vote_average={movie.vote_average}
          />
        ))}
      </Swiper>
      <ListTitle>Tendinddg Movies</ListTitle>
      <TrendingScroll
        contentContainerstyle={{ paddingLeft: 30 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {trending.map((movie) => (
          <Movie key={movie.id}>
            <Poster path={movie.poster_path} />
            <Title>
              {movie.original_title.slice(0, 13)}
              {movie.original_title.length > 13 ? "..." : null}
            </Title>
            <Votes>⭐️{movie.vote_average}/10</Votes>
          </Movie>
        ))}
      </TrendingScroll>
    </Container>
  );
};
export default Movies;
