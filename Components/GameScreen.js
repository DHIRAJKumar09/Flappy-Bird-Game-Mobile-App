
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Text, Image } from 'react-native';

const BIRD_WIDTH = 50;
const BIRD_HEIGHT = 50;
const GRAVITY = 3;
const JUMP_HEIGHT = 60;
const PIPE_WIDTH = 60;
const PIPE_GAP = 200;

const GameScreen = ({ navigation }) => {
    const [birdPosition, setBirdPosition] = useState(200);
    const [pipes, setPipes] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);

    const jump = () => {
        if (gameStarted && !gameOver) {
            setBirdPosition(birdPosition => birdPosition - JUMP_HEIGHT);
        } else if (!gameStarted) {
            setGameStarted(true);
        } else {
            setBirdPosition(200);
            setPipes([]);
            setGameOver(false);
            setGameStarted(true);
        }
    };

    useEffect(() => {
        let gravityInterval;
        let pipeGeneratorInterval;

        if (gameStarted && !gameOver) {
            gravityInterval = setInterval(() => {
                setBirdPosition(birdPosition => birdPosition + GRAVITY);
            }, 30);

            pipeGeneratorInterval = setInterval(() => {
                setPipes(prevPipes => [
                    ...prevPipes,
                    { x: 400, y: Math.floor(Math.random() * 300) },
                ]);
            }, 2000);
        }

        return () => {
            clearInterval(gravityInterval);
            clearInterval(pipeGeneratorInterval);
        };
    }, [gameStarted, gameOver]);

    useEffect(() => {
        const pipesMoveInterval = setInterval(() => {
            if (gameStarted && !gameOver) {
                setPipes(prevPipes =>
                    prevPipes.map(pipe => ({ ...pipe, x: pipe.x - 5 }))
                );
            }
        }, 30);

        return () => clearInterval(pipesMoveInterval);
    }, [gameStarted, gameOver]);

    useEffect(() => {
        if (birdPosition > 800 || birdPosition < 0) {
            setGameOver(true);
            setGameStarted(false);
        }

        pipes.forEach(pipe => {
            if (
                birdPosition < pipe.y + BIRD_HEIGHT ||
                birdPosition + BIRD_HEIGHT > pipe.y + PIPE_GAP
            ) {
                setGameOver(true);
                setGameStarted(false);
            }
        });
    }, [birdPosition, pipes]);

    return (
        <TouchableWithoutFeedback onPress={jump}>
            <View style={styles.container}>
                <Image
                    source={{ uri: "https://media.geeksforgeeks.org/wp-content/uploads/20231211115925/flappy_bird_by_jubaaj_d93bpnj.gif" }}
                    style={[
                        styles.bird,
                        { top: birdPosition },
                    ]}
                />
                {pipes.map((pipe, index) => (
                    <Image
                        key={index}
                        source={{ uri: 'https://media.geeksforgeeks.org/wp-content/uploads/20231211115753/6d2a698f31595a1.png' }}
                        style={[
                            styles.pipe,
                            { left: pipe.x, height: pipe.y },
                        ]}
                    />
                ))}
                {gameOver && (
                    <View style={styles.gameOver}>
                        <Text style={styles.gameOverText}>Game Over</Text>
                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282c34',
    },
    bird: {
        position: 'absolute',
        width: BIRD_WIDTH,
        height: BIRD_HEIGHT,
        left: 50,
    },
    pipe: {
        position: 'absolute',
        width: PIPE_WIDTH,
    },
    gameOver: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -100 }, { translateY: -20 }],
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
        borderRadius: 10,
    },
    gameOverText: {
        color: '#fff',
        fontSize: 24,
    },
});

export default GameScreen;
