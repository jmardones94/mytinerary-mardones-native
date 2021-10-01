import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import * as Yup from "yup"
import usersActions from "../redux/actions/usersActions"

export const useLogIn = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: (values) => loginHandler(values),
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Must be 8 characters or more")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
          "Must have at least one lowercase, one uppercase and one digit."
        )
        .required("Required"),
    }),
  })
  const loginHandler = async (values) => {
    try {
      setLoading(true)
      setError(null)
      const res = await dispatch(usersActions.logIn(values))
      if (!res.success) throw new Error(res.error)
    } catch (e) {
      setError(e.message)
    }
  }
  return [formik, loading, error]
}

export const useSignUp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      photoURL: "",
      country: "",
    },
    onSubmit: (values) => submitHandler(values),
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(2, "Must be 2 characters or more.")
        .required("Required"),
      lastName: Yup.string()
        .min(2, "Must be 2 characters or more.")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Must be 8 characters or more")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
          "Must have at least one lowercase, one uppercase and one digit."
        )
        .required("Required"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
      photoURL: Yup.string().required("Required"),
      country: Yup.string().required("Required"),
    }),
  })
  const submitHandler = async (values) => {
    try {
      setLoading(true)
      const res = await dispatch(usersActions.signUp(values))
      if (!res.success) throw new Error(res.error)
    } catch (e) {
      setError(e.message)
    }
  }
  return [formik, loading, error]
}

export const useStorageLogIn = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState(null)
  const getToken = async () => {
    const token = await AsyncStorage.getItem(
      "token",
      (e) => e && console.log(e)
    )
    if (token) {
      const res = await dispatch(usersActions.tokenLogIn(token))
      if (!res.success) {
        setError(res.error)
      }
    }
    return token
  }
  useEffect(() => {
    getToken()
  }, [])

  return error
}
