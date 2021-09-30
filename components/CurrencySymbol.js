import React from "react"
import { FontAwesome } from "@expo/vector-icons"

const CurrencySymbol = ({ symbol, size }) => {
  switch (symbol) {
    case "£":
      return <FontAwesome name="gbp" size={size || 24} color="black" />
    case "€":
      return <FontAwesome name="eur" size={size || 24} color="black" />
    case "¥":
      return <FontAwesome name="jpy" size={size || 24} color="black" />
    case "₹":
      return <FontAwesome name="inr" size={size || 24} color="black" />
    default:
      return <FontAwesome name="dollar" size={size || 24} color="black" />
  }
}

export default CurrencySymbol
