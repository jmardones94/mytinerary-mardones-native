import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

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
  }, [cities, id])
  return [city, loading, error]
}

export const fetchItineraries = (getItineraries, cityId) => {}

// export const useItineraries = (getItineraries, cityId) => {
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//     getItineraries(cityId)
//       .then((res) => console.log("ke"))
//       .catch((e) => setError(e))
//       .finally(() => setLoading(false))

//   return [
//     itineraries.filter((itinerary) => itinerary.cityId === cityId),
//     loading,
//     error,
//   ]
// }
