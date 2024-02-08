import { useEffect } from "react";
import InputBox from "../atoms/input.atom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { postUserData, updateUserData } from "../services/user.service";

const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("First Name is required"),
  last_name: Yup.string(),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  _id: Yup.string(),
});

export default function UserForm(props: any) {
  let { selectedUser, reLoading, setreLoading } = props;

  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    _id: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { setFieldTouched, validateForm }) => {
      Object.keys(values).forEach((fld) => {
        setFieldTouched(fld, true);
      });

      validateForm(values).then(async () => {
        if (values._id == "") {
          let value:any = values;
          value._id = undefined;
          postUserData(value).then(() => {
            alert("User Added");
            formik.resetForm();
            setreLoading(!reLoading);
          });
        } else {
          updateUserData(values).then(() => {
            alert("User Updated");
            formik.resetForm();
            setreLoading(!reLoading);
          });
        }
      });
      console.log("Submitted", values);
    },
  });

  useEffect(() => {
    if (selectedUser) {
      formik.setValues({
        first_name: selectedUser.first_name,
        last_name: selectedUser.last_name,
        email: selectedUser.email,
        _id: selectedUser._id,
      });
    }
  }, [selectedUser]);

  return (
    <div className="container mt-5 center">
      <h1>User Form</h1>
      <div className="row mt-5">
        <form onSubmit={formik.handleSubmit}>
          <InputBox
            value={formik.values.first_name}
            name="first_name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="First Name"
            placeholder="Enter First Name"
            message={
              formik.errors.first_name &&
              formik.touched.first_name &&
              formik.errors.first_name
            }
          />

          <InputBox
            name="last_name"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Last Name"
            placeholder="Enter Last Name"
            message={
              formik.errors.last_name &&
              formik.touched.last_name &&
              formik.errors.last_name
            }
          />
          <InputBox
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Email"
            placeholder="Enter Email"
            type="email"
            message={
              formik.errors.email && formik.touched.email && formik.errors.email
            }
          />

          <button type="submit" className="mt-5 btn btn-success">
            Save
          </button>

          <button
            type="button"
            onClick={() => formik.resetForm()}
            className="mt-5 btn btn-outline-primary"
          >
            Clear
          </button>
        </form>
      </div>
    </div>
  );
}
