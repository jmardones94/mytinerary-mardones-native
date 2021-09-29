import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { useCities } from "../hooks/citiesHooks"
import citiesActions from "../redux/actions/citiesActions"
import { connect } from "react-redux"
import Loading from "./Loading"
import Layout from "../components/Layout"

const Cities = ({ getCities }) => {
  const [cities, loading, error] = useCities(getCities)
  console.log(cities, loading, error)
  if (loading) return <Loading />
  return (
    <Layout>
      <View>
        <Text>Cities Page</Text>
        <Text>Tengo {cities.length} cities</Text>
      </View>
    </Layout>
  )
}

const mapDispatchToProps = {
  getCities: citiesActions.getCities,
}

export default connect(null, mapDispatchToProps)(Cities)

const styles = StyleSheet.create({})
