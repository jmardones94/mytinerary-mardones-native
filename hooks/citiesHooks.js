import userActions from "../redux/actions/usersActions"
import citiesActions from "../redux/actions/citiesActions"
import { useEffect, useState } from "react"
import { useSelector, useDispatch, connect } from "react-redux"

export const useCities = (getCities) => {
  const [cities, setCities] = useState(
    useSelector((state) => state.cities.cities)
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  useEffect(() => {
    if (!cities.length) {
      getCities()
        .then((cities) => {
          setCities(cities.response)
        })
        .catch((e) => setError(e.message))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])
  return [cities, loading, error]
}

export const useCity = (getCities, id) => {
  const [cities, loading, error] = useCities(getCities)
  const [city, setCity] = useState(cities.find((city) => city._id === id) ?? {})
  useEffect(() => {
    setCity(cities.find((city) => city._id === id) ?? {})
  }, [cities])
  console.log(city, loading, error)
  return [city, loading, error]
}
