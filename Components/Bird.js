// components/Bird.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

const Bird = ({ birdBottom, birdLeft }) => {
  const birdWidth = 50;
  const birdHeight = 60;

  return (
    <View
      style={{
        position: 'absolute',
        width: birdWidth,
        height: birdHeight,
        backgroundColor: 'yellow',
        left: birdLeft - birdWidth / 2,
        bottom: birdBottom - birdHeight / 2,
      }}
    />
  );
};

export default Bird;
