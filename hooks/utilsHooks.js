import axios from "axios"
import { useFonts } from "expo-font"
import { useState, useEffect } from "react"

export const useCountries = () => {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    if (!countries.length) {
      axios
        .get(
          "https://raw.githubusercontent.com/octanna/restcountries/master/src/main/resources/countriesV2.json"
        )
        .then((response) =>
          setCountries(
            response.data.map((c) => {
              return { name: c.name }
            })
          )
        )
        .catch((e) => console.log(e))
    }
  }, [])

  return countries
}

export const useCustomFonts = () => {
  const [loaded, error] = useFonts({
    lemonTuesday: require("../assets/fonts/LemonTuesday.otf"),
    silt: require("../assets/fonts/ShadowsIntoLightTwo.ttf"),
    ubuntu: require("../assets/fonts/Ubuntu-Regular.ttf"),
    ubuntu_bold: require("../assets/fonts/Ubuntu-Bold.ttf"),
    ubuntu_light: require("../assets/fonts/Ubuntu-Light.ttf"),
    ubuntu_medium: require("../assets/fonts/Ubuntu-Medium.ttf"),
  })

  return [loaded, error]
}
