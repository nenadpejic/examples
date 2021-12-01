import React, { ReactElement, useState } from "react";

interface IChildrenProps {
  values: {
    username: string;
    password: string;
  };
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement> | undefined
  ) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement> | undefined) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement> | undefined) => void;
}

interface IMiniFormikProps {
  initialValues?: {
    username: string;
    password: string;
  };
  onSubmit: (values: IChildrenProps["values"]) => void;
  children({
    values,
    handleChange,
    handleBlur,
    handleSubmit,
  }: IChildrenProps): ReactElement;
}

const MiniFormik: React.FC<IMiniFormikProps> = ({
  initialValues,
  onSubmit,
  children,
}) => {
  const [state, setState] = useState({
    values: initialValues || { username: "", password: "" },
    touched: {},
    errors: {},
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement> | undefined
  ) => {
    if (event) {
      const { name, value } = event.target;
      setState((prevState) => ({
        ...prevState,
        values: {
          ...prevState.values,
          [name]: value,
        },
      }));
    }
  };

  const handleBlur = (
    event: React.FocusEvent<HTMLInputElement> | undefined
  ) => {
    if (event) {
      const { name } = event.target;
      setState((prevState) => ({
        ...prevState,
        touched: {
          ...prevState.touched,
          [name]: true,
        },
      }));
    }
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement> | undefined
  ) => {
    if (event) {
      event.preventDefault();
      // validate
      onSubmit(state.values);
    }
  };

  // NOTE: You can use cloneElement() to give your child component access to props
  // return React.cloneElement(children, {
  //   state,
  //   handleChange,
  // });

  return (
    <div>
      {children({
        values: state.values,
        handleChange,
        handleBlur,
        handleSubmit,
      })}
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
};

export default MiniFormik;
