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

export const useItineraries = (getItineraries, itineraryId, itineraries) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    if (!itineraries.find((itinerary) => itinerary._id === itineraryId)) {
      getItineraries(itineraryId)
        .then((res) => res)
        .catch((e) => setError(e.message))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [itineraryId])

  return [loading, error]
}

export const useComments = (getComments, itineraryId, comments) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    if (
      !comments.filter((comment) => comment.itineraryId === itineraryId).length
    ) {
      getComments(itineraryId)
        .then((res) => res)
        .catch((e) => setError(e.message))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [itineraryId])

  return [loading, error]
}

export const useActivities = (getActivities, itineraryId, activities) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useState(() => {
    setLoading(true)
    setError(null)
    if (
      !activities.filter((activity) => activity.itineraryId === itineraryId)
        .length
    ) {
      getActivities(itineraryId)
        .then((res) => res)
        .catch((e) => setError(e.message))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [itineraryId])

  return [loading, error]
}
