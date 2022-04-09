import React, { useEffect } from "react";

import styled from "styled-components/native";
import { View } from "react-native";
import { Text } from "react-native";
const Container = styled.ScrollView`
  background-color: #1e272e;
`;

const Detail = ({
  route: {
    params: { originalTitle },
  },
  navigation: { setOptions },
}) => {
  useEffect(() => {
    setOptions({ title: originalTitle });
    console.log(originalTitle);
  }, []);
  return (
    <Container>
      <Text>{originalTitle}</Text>
    </Container>
  );
};

export default Detail;
