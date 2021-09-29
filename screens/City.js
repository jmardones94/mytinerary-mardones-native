import React from "react"
import { Dimensions, Image, StyleSheet, Text, View } from "react-native"
import { useCity } from "../hooks/citiesHooks"
import { connect } from "react-redux"
import citiesActions from "../redux/actions/citiesActions"
import Loading from "./Loading"
import Layout from "../components/Layout"

const City = ({ getCities }) => {
  const [city, loading, error] = useCity(getCities, "611560ad51d6021dd04f9974")
  if (loading) return <Loading />
  if (error) return <Text>Error.</Text>
  return (
    <Layout>
      <View>
        <View style={styles.title}>
          <Image style={styles.flag} source={{ uri: city.countryFlag }} />

          <Text style={styles.titleText}>
            {city.name}, {city.country}.
          </Text>
        </View>
        <Image style={styles.img} source={{ uri: city.src }} />
        <Text>City Page</Text>
        <Text>Renderizando a {city.name}</Text>
      </View>
    </Layout>
  )
}

const mapDispatchToProps = {
  getCities: citiesActions.getCities,
}

export default connect(null, mapDispatchToProps)(City)

const styles = StyleSheet.create({
  title: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    justifyContent: "center",
  },
  titleText: {
    fontSize: 36,
    textAlign: "center",
    marginVertical: 20,
    marginHorizontal: 10,
  },
  flag: { width: 50, height: 50 },
  img: {
    width: (Dimensions.get("screen").width * 19) / 20,
    height: 150,
    borderRadius: 8,
  },
})
