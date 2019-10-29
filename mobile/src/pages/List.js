import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Image,
  AsyncStorage,
  StyleSheet,
  ScrollView
} from "react-native";

import SpotList from "../components/SpotList";

import logo from "../assets/logo.png";

export default function List() {
  const [techs, setTechs] = useState([]);

  //tranformar uma string em array
  //ReactJS, Node.js

  useEffect(() => {
    AsyncStorage.getItem("techs").then(techs => {
      const techsArray = storageTechs.split(",").map(techs => techs.trim());

      setTechs(techsArray);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <ScrollView>
        {techs.map(tech => (
          <SpotList Key={tech} tech={tech} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 10
  }
});
