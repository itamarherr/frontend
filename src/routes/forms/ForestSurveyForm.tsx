import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Spinner from "../../Components/Spinner";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { services_api } from "../../api/services-api";
import { ForestSurveyData } from "../../api/services-api";

const ForestSurveyForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/ForestSurveyPage");
  };

  const checkListItems = [
    { id: 1, name: "Tree Age" },
    { id: 2, name: "Stem diameter" },
    { id: 3, name: "Tree height" },
    { id: 4, name: "Tree Health status" },
    { id: 5, name: "Tree location" },
    { id: 6, name: "Tree Number" },
    { id: 7, name: "Tree Type" },
  ];
  const validationSchema = Yup.object({
    location: Yup.string().required("Location is required"),
    areasize: Yup.number()
      .required("area size is required")
      .min(0, "Area size must be positive"),
    surveyPurpose: Yup.string().required("Survey porpose is required"),
    forestType: Yup.string().required("Fores type is required"),
    isMeasurementMap: Yup.boolean().required("do you have measurement map?"),
    measurementMap: Yup.mixed().when(
      "isMeasurementMap",
      (isMeasurementMap, schema) =>
        isMeasurementMap
          ? schema.required("Measurement map is required")
          : schema.notRequired()
    ),
    checkListItems: Yup.array().of(
      Yup.object().shape({
        id: Yup.number(),
        isSelected: Yup.boolean(),
      })
    ),
  });

  const initialValues = {
    location: "",
    areaSize: "",
    surveyPurpose: "",
    forestType: "",
    isMeasurementMap: false,
    checkListItems: checkListItems.map((item) => ({
      id: item.id,
      name: item.name,
      isSelected: false,
    })),
  };

  const showSuccessDialog = (message) => {
    // Simple alert-based implementation
    alert(message);
    return Promise.resolve();
  };

  const showErrorDialog = (message) => {
    // Simple alert-based implementation
    alert(message);
    return Promise.resolve();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setIsLoading(true);
        const jwt = localStorage.getItem("jwtToken") || "";
        const requestData: ForestSurveyData = {
          id: 0,
          location: values.location,
          areaSize: parseFloat(values.areaSize),
          surveyPurpose: values.surveyPurpose,
          forestType: values.forestType,
          isMeasurementMap: values.isMeasurementMap,
          checkListItems: values.checkListItems.filter(
            (item) => item.isSelected
          ),
        };
        services_api
          .createServices(jwt, requestData)
          .then(() => {
            showSuccessDialog(
              "Forest survey order was created successfully"
            ).then(() => navigate("/surveys"));
          })
          .catch(() => {
            showErrorDialog("Field to create forest survey order");
          })
          .finally(() => {
            setIsLoading(false);
          });
      }}
    >
      {({ values }) => (

        <>
        <h1 className="font-bold text-4xl mb-6 mt-12 text-center" >Order forest Survey Form</h1>
        <h2 className="text-2xl mb-12 text-center" > fill the form to order the forest survey you wont</h2>
        <Form className="flex flex-col item-center">
          {isLoading && <Spinner title="Processing..." />}
          {error && <p className="test-red-500">{error}</p>}

          <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg my-4">
            <label htmlFor="location">Location</label>
            <Field
              name="location"
              type="text"
              id="location"
              className="rounded-md hover:border-2 border-2 px-2 py-2"
            />
            <ErrorMessage
              name="location"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg my-4">
            <label htmlFor="areaSize">Area Size (sq. km)</label>
            <Field
              name="areaSize"
              type="number"
              id="areaSize"
              className="rounded-md hover:border-2 border-2 px-2 py-2"
            />
            <ErrorMessage
              name="areaSize"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg my-4">
            <label htmlFor="surveyPurpose">Survey Purpose</label>
            <Field
              name="surveyPurpose"
              type="text"
              id="surveyPurpose"
              CalssName="rounded-md hover:border-2 border-2 px-2 py-2"
            />
            <ErrorMessage
              name="surveyPurpose"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg my-4">
            <label htmlFor="forestType">Forest Type</label>
            <Field
              name="forestType"
              type="text"
              id="forestType"
              className="rounded-md hover:border-2 border-2 px-2 py-2"
            />
            <ErrorMessage
              name="forestType"
              component="div"
              className="text-red-500"
            />
          </div>

          {/* Is Measurement Map */}
          <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg my-4">
            <label htmlFor="isMeasurementMap">
              Is Measurement Map Available?
            </label>
            <Field
              name="isMeasurementMap"
              type="checkbox"
              id="isMeasurementMap"
              className="ml-2"
            />
            <ErrorMessage
              name="isMeasurementMap"
              component="div"
              className="text-red-500"
            />
          </div>

          {/* Checklist Items */}
          <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg my-4">
            <label>Checklist Items</label>
            {checkListItems.map((item, index) => (
              <div key={item.id} className="flex items-center my-2">
                <Field
                  name={`checkListItems[${index}].isSelected`}
                  type="checkbox"
                  id={`checkListItems[${index}].isSelected`}
                  className="mr-2"
                />
                <label htmlFor={`checkListItems[${index}].isSelected`}>
                  {item.name}
                </label>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button
             onClick={handleSubmit}
              disabled={isLoading}
              type="submit"
              className="bg-green-500 disabled:bg-green-500/50 w-1/2 block text-center hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-4"
            >
              Submit Survey
            </button>
          </div>
        </Form>
        </>
      )}
    </Formik>
  );
};
export default ForestSurveyForm;
