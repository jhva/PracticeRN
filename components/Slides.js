import React from "react";
import styled from "styled-components/native";
import { View, StyleSheet, useColorScheme } from "react-native";
import { makeImgPath } from "../utils";
import { BlurView } from "expo-blur";
import Poster from "./Poster";
const BgImg = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;
const Overview = styled.Text`
  margin-top: 10px;
  color: rgba(255, 255, 255, 0.6);
`;

const Tilte = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: white;
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Column = styled.View`
  width: 40%;
  margin-left: 15px;
`;
const Votes = styled(Overview)`
  font-size: 12px;
`;
const Slide = ({
  backdrop_path,
  poster_path,
  original_title,
  overview,
  vote_average,
}) => {
  const isDark = useColorScheme() === "dark";

  return (
    <View style={{ flex: 1 }}>
      <BgImg source={{ url: makeImgPath(backdrop_path) }} />
      <BlurView
        tint={isDark ? "dark" : "light"}
        intensity={95}
        style={StyleSheet.absoluteFill}
      >
        <Wrapper>
          <Poster path={poster_path} />
          <Column>
            <Tilte>{original_title}</Tilte>
            <Overview>{overview.slice(0, 90)}...</Overview>
            {vote_average > 0 ? <Votes>⭐️{vote_average}/10</Votes> : null}
          </Column>
        </Wrapper>
      </BlurView>
    </View>
  );
};

export default Slide;
