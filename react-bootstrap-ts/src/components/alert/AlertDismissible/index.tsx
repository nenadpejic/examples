import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";

const AlertDismissible = () => {
  const [show, setShow] = useState(true);

  return (
    <>
      <Alert show={show} variant="success">
        <Alert.Heading>Heading</Alert.Heading>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis,
          doloremque odit quis ullam natus soluta. Recusandae expedita
          cupiditate consequatur eum quisquam, officiis, architecto esse labore
          totam atque beatae error. Architecto.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            Close
          </Button>
        </div>
      </Alert>

      {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>}
    </>
  );
};

export default AlertDismissible;
