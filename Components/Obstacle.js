// Obstacle.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

const Obstacle = ({ obstacleLeft, obstacleWidth, obstacleHeight, gap }) => {
  return (
    <>
      <View
        style={{
          position: 'absolute',
          backgroundColor: 'green',
          width: obstacleWidth,
          height: obstacleHeight,
          left: obstacleLeft,
          bottom: gap + obstacleHeight,
        }}
      />
      <View
        style={{
          position: 'absolute',
          backgroundColor: 'green',
          width: obstacleWidth,
          height: obstacleHeight,
          left: obstacleLeft,
          bottom: 0,
        }}
      />
    </>
  );
};

export default Obstacle;
