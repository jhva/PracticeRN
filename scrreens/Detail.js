import React, { useEffect } from "react";

import styled from "styled-components/native";
import {
  View,
  Dimensions,
  StyleSheet,
  Linking,
  Share,
  Platform,
} from "react-native";
import { Text } from "react-native";
import Poster from "../components/Poster";
import { LinearGradient } from "expo-linear-gradient";
import { makeImgPath } from "../utils";
import { BLACK_COLOR } from "../colors";
import { useQuery } from "react-query";
import { moviesApi, tvApi } from "../api";
import Loader from "../components/Loader";
import { Ionicons } from "@expo/vector-icons";
import * as Webbrowser from "expo-web-browser";
import { TouchableOpacity } from "react-native";
const Container = styled.ScrollView`
  background-color: #1e272e;
`;
const Data = styled.View`
  padding: 0px 20px;
`;

const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end;
  padding: 0px 20px;
`;
const Background = styled.Image``;
const Column = styled.View`
  width: 80%;
  flex-direction: row;
`;

const Title = styled.Text`
  color: white;
  font-size: 36px;
  align-self: flex-end;
  margin-left: 15px;
  font-weight: 500;
`;

const Overview = styled.Text`
  color: white;
  margin: 20px 0px;
`;
const VideoBtn = styled.TouchableOpacity`
  flex-direction: row;
`;
const BtnText = styled.Text`
  color: white;
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 24px;
  margin-left: 10px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Detail = ({ route: { params }, navigation: { setOptions } }) => {
  const isMovie = "original_title" in params;
  const shareMedia = async () => {
    const isAndroid = Platform.OS === "android";
    const homepage = isMovie
      ? `https://www.imdb.com/title/${data.imdb_id}/`
      : data.homepage;
    if (isAndroid) {
      await Share.share({
        message: `${params.overview}\nCheck it out: ${homepage}`,
        title:
          "original_title" in params
            ? params.original_title
            : params.original_name,
      });
    } else {
      await Share.share({
        url: homepage,
        title:
          "original_title" in params
            ? params.original_title
            : params.original_name,
      });
    }
  };
  const ShareButton = () => (
    <TouchableOpacity onPress={shareMedia}>
      <Ionicons name="share-outline" color="white" size={24} />
    </TouchableOpacity>
  );
  const { isLoading, data } = useQuery(
    [isMovie ? "movies" : "tv", params.id],
    isMovie ? moviesApi.detail : tvApi.detail
  );
  //   const { isLoading: tvLoading, data: tvData } = useQuery(
  //     ["tv", params.id],
  //     tvApi.detail,
  //     {
  //       enabled: "original_name" in params,
  //     }
  //   );
  useEffect(() => {
    setOptions({
      title: "original_title" in params ? "Movie" : "TV SHOW",
    });
  }, []);
  useEffect(() => {
    if (data) {
      setOptions({
        headerRight: () => <ShareButton />,
      });
    }
  }, [data]);
  const openYTLink = async (videoId) => {
    const baseUrl = `http://m.youtube.com/watch?v=${videoId}`;
    // await Linking.openURL(baseUrl);
    await Webbrowser.openBrowserAsync(baseUrl);
  };
  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(params.backdrop_path) }}
        />
        <LinearGradient
          colors={["transparent", BLACK_COLOR]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={params.poster_path || ""} />
          <Title>
            {"original_title" in params
              ? params.original_title
              : params.original_name}
          </Title>
        </Column>
      </Header>
      <Data>
        <Overview>{params.overview}</Overview>
        {isLoading ? <Loader /> : null}
        {data?.videos?.results?.map((video) => (
          <VideoBtn
            key={video.key}
            onPress={() => {
              openYTLink(video.key);
            }}
          >
            {console.log(data, "1231231")}

            <Ionicons name="logo-youtube" color="white" size={24} />
            <BtnText>{video.name}</BtnText>
          </VideoBtn>
        ))}
      </Data>
    </Container>
  );
};

export default Detail;
