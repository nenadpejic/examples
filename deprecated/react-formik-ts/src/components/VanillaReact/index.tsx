import React, { useState } from "react";

const initialValues = {
  username: "",
  password: "",
};

const VanillaReact = () => {
  const [values, setValues] = useState(initialValues);

  const handleChangeForm = (
    event: React.ChangeEvent<HTMLInputElement> | undefined
  ) => {
    if (event) {
      const { name, value } = event.target;
      setValues({
        ...values,
        [name]: value,
      });
    }
  };

  return (
    <form>
      <input
        name="username"
        value={values.username}
        onChange={handleChangeForm}
      />
      <input
        name="password"
        value={values.password}
        onChange={handleChangeForm}
      />
    </form>
  );
};

export default VanillaReact;
