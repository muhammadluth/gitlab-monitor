import React, { useState } from "react";
import { signIn } from "next-auth/client";

import { Formik, Field, Form } from "formik";

import { initialValuesFormLogin, validationSchemaFormLogin } from "utils/forms";

import Auth from "layouts/Auth.js";

export default function SignIn() {
  const [isVisible, setIsVisible] = useState(false);

  const handleVisible = () => {
    setIsVisible((prev) => !prev);
  };
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-gray-600 text-sm font-bold">Sign In</h6>
                </div>
                <hr className="mt-6 border-b-1 border-gray-400" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <Formik
                  enableReinitialize={true}
                  initialValues={initialValuesFormLogin}
                  validationSchema={validationSchemaFormLogin}
                  onSubmit={(values) => {
                    const { private_access_token } = values;
                    signIn("credentials", {
                      private_access_token,
                      callbackUrl: `${window.location.origin}/admin/dashboard`,
                    });
                  }}
                >
                  {({ touched, errors, isSubmitting, handleSubmit }) => (
                    <>
                      <Form>
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Private Access Token
                          </label>
                          <Field
                            type={isVisible ? "text" : "password"}
                            name="private_access_token"
                            className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                            placeholder="Private Access Token"
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 pt-6 flex items-center text-sm leading-5">
                            <svg
                              className={`h-6 text-gray-700 ${
                                isVisible ? "block" : "hidden"
                              }`}
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              viewbox="0 0 576 512"
                              onClick={handleVisible}
                            >
                              <path
                                fill="currentColor"
                                d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                              ></path>
                            </svg>

                            <svg
                              className={`h-6 text-gray-700 ${
                                isVisible ? "hidden" : "block"
                              }`}
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              viewbox="0 0 640 512"
                              onClick={handleVisible}
                            >
                              <path
                                fill="currentColor"
                                d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
                              ></path>
                            </svg>
                          </div>
                        </div>
                        <div>
                          {touched.private_access_token &&
                            errors.private_access_token && (
                              <span class="flex items-center font-medium tracking-wide text-red-500 text-sm mt-1 ml-1">
                                {errors.private_access_token}
                              </span>
                            )}
                        </div>

                        <div className="text-center mt-6">
                          <button
                            className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full inline-flex items-center justify-center ease-linear transition-all duration-150"
                            type="button"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                          >
                            {isSubmitting && (
                              <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  stroke-width="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                            )}
                            Sign In
                          </button>
                        </div>
                      </Form>
                    </>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

SignIn.layout = Auth;
