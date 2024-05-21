import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Formtask() {
  const location = useLocation();
  const { index } = useParams();
  const schema = Yup.object().shape({
    title: Yup.string().required("title is required"),
    description: Yup.string().required("description is required"),
  });

  const [edit, setEdit] = useState({});
  const [d, setd] = useState(false);

  useEffect(() => {
    setd(true);
    const data = localStorage.getItem("tasks");
    const tasks = JSON.parse(data);
    setEdit(tasks[index]);
  }, []);

  console.log(location);
  return (
    <>
      {d && (
        <Formik
          initialValues={{
            title: location.pathname == "/create" ? "" : edit.title,
            description: location.pathname == "/create" ? "" : edit.description,
            done: false,
          }}
          validationSchema={schema}
          onSubmit={async (values) => {
            const data = localStorage.getItem("tasks");
            const tasks = JSON.parse(data);
            if (location.pathname == "/create") {
              tasks.push(values);
              localStorage.setItem("tasks", JSON.stringify(tasks));
            } else if (location.pathname.split("/").includes("edit")) {
              tasks.splice(index, 1, values);
              localStorage.setItem("tasks", JSON.stringify(tasks));
            }
          }}
        >
          {({ errors, touched }) => (
            <Form className="mt-6">
              <div className="mb-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Title
                </label>
                <Field
                  className=" opacity-70 block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  name="title"
                />
                {errors.title && touched.title ? (
                  <div>{errors.title}</div>
                ) : null}
              </div>
              <div className="mb-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-semibold text-gray-800"
                >
                  description
                </label>
                <Field
                  type="description"
                  className="block opacity-70 w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  name="description"
                />
                {errors.description && touched.description ? (
                  <div>{errors.description}</div>
                ) : null}
              </div>
              {/* <a href="#" className="text-xs text-purple-600 hover:underline">
          Forget Password?
        </a> */}
              <div className="mt-6">
                <button
                  type="submit"
                  name="submit"
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                >
                  {location.pathname == "/create"
                    ? "Add new Task"
                    : "Save Update"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
}

export default Formtask;
