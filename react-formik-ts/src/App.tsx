import MiniFormik from "components/MiniFormik";
import VanillaReact from "components/VanillaReact";
import WithFormik from "components/WithFormik";
import React from "react";

function App() {
  return (
    <div>
      {/* <VanillaReact /> */}

      {/* <MiniFormik
        initialValues={{ username: "John", password: "123" }}
        onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <input
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <input
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <button type="submit">Submit</button>
          </form>
        )}
      </MiniFormik> */}

      <WithFormik />
    </div>
  );
}

export default App;
