import { useFormik } from "formik"
import { useState } from "react"
import * as Yup from "yup"

export const useLogIn = (logIn) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
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
      const res = await logIn(values)
      setLoading(false)
      if (!res.success) throw new Error(res.error)
    } catch (e) {
      setError(e.message)
    }
  }
  return [formik, loading, error]
}

export const useSignUp = (signUp) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
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
      const res = await signUp(values)
      setLoading(false)
      if (!res.success) throw new Error(res.error)
    } catch (e) {
      setError(e.message)
    }
  }
  return [formik, loading, error]
}
