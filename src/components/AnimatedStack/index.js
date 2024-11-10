import React, { useEffect, useState } from "react";
import { View, StyleSheet, useWindowDimensions, Pressable } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    useAnimatedGestureHandler,
    useDerivedValue,
    interpolate,
    runOnJS,
} from "react-native-reanimated";
import { PanGestureHandler, GestureHandlerRootView } from "react-native-gesture-handler";
import { registerRootComponent } from "expo";
import Like from "../../../assets/images/LIKE.png";
import Nope from "../../../assets/images/nope.png";

const ROTATION = 60;
const SWIPE_VELOCITY = 800;

const AnimatedStack = (props) => {
    const { data, renderItem, onSwipeLeft, onSwipeRight } = props;

    // console.log(data)

    const [currentIndex, setCurrentIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(currentIndex + 1);
    const currentProfile = data[currentIndex];
    const nextProfile = data[nextIndex];

    const { width: screenWidth } = useWindowDimensions();
    const hiddenTranslateX = 2 * screenWidth;

    const translateX = useSharedValue(0); // -width  0   width
    const rotate = useDerivedValue(() => interpolate(translateX.value, [0, hiddenTranslateX], [0, ROTATION]) + "deg");

    const cardStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: translateX.value,
            },
            {
                rotate: rotate.value,
            },
        ],
    }));

    const nextCardStyle = useAnimatedStyle(() => ({
        transform: [
            {
                scale: interpolate(translateX.value, [-hiddenTranslateX, 0, hiddenTranslateX], [1, 0.8, 1]),
            },
        ],
        opacity: interpolate(translateX.value, [-hiddenTranslateX, 0, hiddenTranslateX], [1, 0.6, 1]),
    }));

    const likeStyle = useAnimatedStyle(() => ({
        opacity: interpolate(translateX.value, [0, hiddenTranslateX / 5], [0, 1]),
    }));
    const nopeStyle = useAnimatedStyle(() => ({
        opacity: interpolate(translateX.value, [0, -hiddenTranslateX / 5], [0, 1]),
    }));

    const gestureHandler = useAnimatedGestureHandler({
        onStart: (_, context) => {
            context.startX = translateX.value;
        },
        onActive: (event, context) => {
            translateX.value = event.translationX;
            translateX.value = context.startX + event.translationX;
        },
        onEnd: (event) => {
            if (Math.abs(event.velocityX) < SWIPE_VELOCITY) {
                translateX.value = withSpring(0);
                return;
            }

            (translateX.value = withSpring(hiddenTranslateX * Math.sign(event.velocityX))),
                {},
                runOnJS(setCurrentIndex)(currentIndex + 1);

            const onSwipe = event.velocityX > 0 ? onSwipeRight : onSwipeLeft;
            runOnJS(onSwipe)(currentProfile);
        },
    });

    useEffect(() => {
        translateX.value = 0;
        setNextIndex(currentIndex + 1);
    }, [currentIndex, translateX]);

    return (
        <View style={styles.root}>
            {nextProfile && (
                <View style={styles.nextCardContainer}>
                    <Animated.View style={[styles.animatedCard, nextCardStyle]}>
                        {renderItem({ item: nextProfile })}
                    </Animated.View>
                </View>
            )}
            {currentProfile && (
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <PanGestureHandler onGestureEvent={gestureHandler}>
                        <Animated.View style={[styles.animatedCard, cardStyle]}>
                            <Animated.Image
                                source={Like}
                                style={[styles.like, { left: 10 }, likeStyle]}
                                resizeMode="contain"
                            />
                            <Animated.Image
                                source={Nope}
                                style={[styles.like, { right: 10 }, nopeStyle]}
                                resizeMode="contain"
                            />
                            {renderItem({ item: currentProfile })}
                        </Animated.View>
                    </PanGestureHandler>
                </GestureHandlerRootView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        width: "100%",
    },
    animatedCard: {
        width: "90%",
        height: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    nextCardContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
    },
    like: {
        width: 150,
        height: 150,
        position: "absolute",
        top: 200,
        zIndex: 1,
        // elevation: 1,
    },
});

export default AnimatedStack;

registerRootComponent(AnimatedStack);
