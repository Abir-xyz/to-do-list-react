import React, { useEffect } from 'react';

const Alert = ({ type, msg, removeAlert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 1000);
    return () => clearTimeout(timeout);
  }, [list]);

  return <p className={`alert-txt ${type}`}>{msg}</p>;
};

export default Alert;
