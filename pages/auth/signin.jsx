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
                  {({ isSubmitting, handleSubmit }) => (
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
                        </div>
                        <div>
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              id="customCheckLogin"
                              type="checkbox"
                              className="form-checkbox text-gray-800 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                              onChange={handleVisible}
                            />
                            <span className="ml-2 text-sm font-semibold text-gray-700">
                              Show Private Access Token
                            </span>
                          </label>
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
