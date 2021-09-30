import axios from "axios"
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
