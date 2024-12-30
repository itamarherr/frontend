import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { showErrorDialog, showSuccessDialog } from "../../dialogs/dialogs";
import { string } from "yup";
import { Value } from "sass";

const UpdateOrderForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(string);
  const navigate = useNavigate();
  const handleSubmit = async (Value, { setSubmitting }) => {
    const jwt = localStorage.getItem("token");
    if (!jwt) {
      showErrorDialog("Authentication failed. Please log in again.");
      setIsLoading(false);
      setSubmitting(false);
      return;
    }
  };

  return <div>UpdateOrderForm</div>;
};

export default UpdateOrderForm;
