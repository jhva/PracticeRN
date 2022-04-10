import React from "react";
import styled from "styled-components/native";
import {
  View,
  StyleSheet,
  useColorScheme,
  TouchableWithoutFeedback,
} from "react-native";
import { makeImgPath } from "../utils";
import { BlurView } from "expo-blur";
import Poster from "./Poster";
import { useNavigation } from "@react-navigation/native";
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
  fullData,
}) => {
  const isDark = useColorScheme() === "dark";
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("Stack", {
      screen: "Detail",
      params: {
        ...fullData,
      },
    });
  };
  return (
    <TouchableWithoutFeedback onPress={goToDetail}>
      <View style={{ flex: 1 }}>
        <BgImg
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(backdrop_path) }}
        />
        <BlurView
          tint={isDark ? "dark" : "light"}
          intensity={85}
          style={StyleSheet.absoluteFill}
        >
          <Wrapper>
            <Poster path={poster_path} />
            <Column>
              <Tilte isDark={isDark}>{original_title}</Tilte>
              {vote_average > 0 ? (
                <Votes isDark={isDark}>⭐️ {vote_average}/10</Votes>
              ) : null}
              <Overview isDark={isDark}>{overview.slice(0, 100)}...</Overview>
            </Column>
          </Wrapper>
        </BlurView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Slide;
