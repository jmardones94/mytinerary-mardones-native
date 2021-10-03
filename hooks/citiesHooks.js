import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import citiesActions from "../redux/actions/citiesActions"
import itinerariesActions from "../redux/actions/itinerariesActions"

export const useCities = () => {
  const cities = useSelector((state) => state.cities.cities)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  useEffect(() => {
    setLoading(true)
    setError(null)
    if (!cities.length) {
      dispatch(citiesActions.getCities())
        .then((cities) => cities)
        .catch((e) => setError(e.message))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])
  return [cities, loading, error]
}

export const useCity = (id) => {
  const [cities, loading, error] = useCities()
  const [city, setCity] = useState(cities.find((city) => city._id === id) ?? {})
  useEffect(() => {
    setCity(cities.find((city) => city._id === id) ?? {})
  }, [cities, id])

  return [city, loading, error]
}

export const useItineraries = (cityId) => {
  const itineraries = useSelector((state) => state.itineraries.itineraries)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    setLoading(true)
    setError(null)
    if (
      !itineraries.filter((itinerary) => itinerary.cityId === cityId).length
    ) {
      dispatch(itinerariesActions.getItineraries(cityId))
        .then((itineraries) => itineraries)
        .catch((e) => setError(e.message))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [cityId])

  return [itineraries, loading, error]
}

export const useItinerary = (itineraryId, cityId) => {
  const [itineraries, loading, error] = useItineraries(cityId)
  const [itinerary, setItinerary] = useState(
    itineraries.find((itinerary) => itinerary._id === itineraryId) ?? {}
  )

  useEffect(() => {
    setItinerary(
      itineraries.find((itinerary) => itinerary._id === itineraryId) ?? {}
    )
  }, [itineraries, itineraryId, cityId])

  return [itinerary, loading, error]
}

export const useComments = (itineraryId) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const comments = useSelector((state) => state.itineraries.comments)
  const dispatch = useDispatch()
  useEffect(() => {
    setLoading(true)
    setError(null)
    if (
      !comments.filter((comment) => comment.itineraryId === itineraryId).length
    ) {
      dispatch(itinerariesActions.getComments(itineraryId))
        .then((res) => res)
        .catch((e) => setError(e.message))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [itineraryId])

  return [
    comments.filter((comment) => comment.itineraryId === itineraryId),
    loading,
    error,
  ]
}

export const useActivities = (itineraryId) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const activities = useSelector((state) => state.itineraries.activities)
  const dispatch = useDispatch()
  useEffect(() => {
    setLoading(true)
    setError(null)
    console.log()
    if (
      !activities.filter((activity) => activity.itineraryId === itineraryId)
        .length
    ) {
      console.log("Estoy cargando nuevas activities")
      dispatch(itinerariesActions.getActivities(itineraryId))
        .then((res) => res)
        .catch((e) => setError(e.message))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [itineraryId])
  return [activities, loading, error]
}
