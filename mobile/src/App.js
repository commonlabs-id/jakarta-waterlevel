import React from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import { AppLoading } from "expo";

import { Point } from "./components/points";
import MainCard from "./components/cards/main";
import { getLocaleDateString } from "./util/dates";
import { elevationShadowStyle } from "./util/shadow";

export default class App extends React.Component {
  state = {
    loaded: false,
    data: null
  };

  async componentWillMount() {
    const [data] = await Promise.all([
      fetch("https://waterlevel.mathdroid.now.sh").then(resp => resp.json())
    ]);
    // once loaded, update state
    this.setState({
      loaded: true,
      data
    });
  }

  render() {
    const { loaded } = this.state;

    // if application is not yet loaded
    if (!loaded) {
      return <AppLoading />;
    }

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.title}>Jakarta Waterlevel</Text>

        <MainCard />
        <Text style={styles.subtitle}>{getLocaleDateString(new Date())}</Text>
        <View style={styles.card}>
          {this.state.data.points.map(point => (
            <Point point={point} key={point.name} />
          ))}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee"
  },
  card: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 4,
    ...elevationShadowStyle(1),
    marginBottom: 32
  },
  contentContainer: {
    alignItems: "stretch",
    paddingTop: 32,
    paddingHorizontal: 16
  },
  title: {
    color: "#000",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 32
  },
  subtitle: {
    color: "#000",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16
  }
});
