import React from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView
} from "react-native";
import { AppLoading, Asset, Video } from "expo";

import { getLocaleDateString } from "./util/dates";
import Points from "./components/points";

// set path to local video
const videoSource = require("../assets/video/wave.mp4");

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    backgroundOpacity: new Animated.Value(0),
    loaded: false,
    videoHeight: (width * 9) / 16,
    videoWidth: width,
    data: null
  };

  async componentWillMount() {
    // wait for video to download
    const [_, data] = await Promise.all([
      Asset.fromModule(videoSource).downloadAsync(),
      fetch("https://waterlevel.mathdroid.now.sh").then(resp => resp.json())
    ]);
    // once loaded, update state
    this.setState({
      loaded: true,
      data
    });
  }

  // this is called from the video::onLoad()
  fadeInVideo = () => {
    const { backgroundOpacity } = this.state;
    setTimeout(() => {
      // animate spring
      // https://facebook.github.io/react-native/docs/animated#spring
      Animated.spring(backgroundOpacity, {
        toValue: 1
      }).start();
    }, 400);
  };

  render() {
    const { backgroundOpacity, loaded, videoHeight, videoWidth } = this.state;

    // if application is not yet loaded
    if (!loaded) {
      return <AppLoading />;
    }

    return (
      <ScrollView
        style={{ backgroundColor: "#f0f0f0" }}
        contentContainerStyle={styles.container}
      >
        <View>
          <Animated.View style={[{ opacity: backgroundOpacity }]}>
            <Video
              isLooping
              isMuted={false}
              onLoad={() => this.fadeInVideo()}
              resizeMode="cover"
              shouldPlay
              source={videoSource}
              style={{ height: videoHeight, width: videoWidth }}
            />
            <View
              style={{
                ...styles.overlay,
                height: videoHeight,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column"
              }}
            />
          </Animated.View>
        </View>
        <View
          style={{
            marginTop: -150,
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flexDirection: "column",
            marginHorizontal: 16
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 32,
              fontWeight: "bold"
            }}
          >
            Jakarta Waterlevel
          </Text>

          <Text
            style={{
              color: "#fff",
              marginBottom: 16
            }}
          >
            {getLocaleDateString(new Date())}
          </Text>
          <View
            style={{
              height: 150,
              padding: 16,
              backgroundColor: "#fff",
              borderRadius: 4,
              ...elevationShadowStyle(3)
            }}
          >
            <Text>
              This is where you might put a button or some other text on top of
              the video
            </Text>
          </View>
        </View>
        <Points points={this.state.data.points} date={this.state.data.date} />
      </ScrollView>
    );
  }
}

function elevationShadowStyle(elevation) {
  return {
    elevation,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0.5 * elevation },
    shadowOpacity: 0.1,
    shadowRadius: 0.4 * elevation
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center"
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)"
  },
  title: {
    color: "#fff",
    fontSize: 20,
    marginTop: 90,
    paddingHorizontal: 20,
    textAlign: "center"
  }
});
