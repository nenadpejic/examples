import { Field, Form, Formik } from "formik";
import React from "react";

interface IInitialValues {
  friends: {
    name: string;
    email: string;
  }[];
}

const initialValues: IInitialValues = {
  friends: [
    {
      name: "",
      email: "",
    },
  ],
};

const WithFormik = () => {
  const handleSubmit = (values: IInitialValues) => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <div className="row">
            <div className="col">
              <Field name="name" type="text" placeholder="Jane Doe" />
            </div>
            <div className="col">
              <Field name="email" type="email" />
            </div>
            <div className="col">
              <button type="button">x</button>
            </div>
          </div>
          <button type="submit" disabled={isSubmitting}>
            Add Friend
          </button>
          <button type="submit" disabled={isSubmitting}>
            Invite
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default WithFormik;
