import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/solid";
import { Formik } from "formik";
import { createMilestoneInTask } from "../../api/milestones";

export default function MilestoneCreationModal({
  onSuccess,
  children,
  taskId,
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onCloseModal = () => {
    setOpen(false);
  };

  const onOpenModal = () => {
    setOpen(true);
  };

  const onCreateMilestone = async (values) => {
    setLoading(true);
    setError(null);

    try {
      await createMilestoneInTask(taskId, {
        name: values.name,
        description: values.description || undefined,
      });

      setOpen(false);
      onSuccess();
    } catch (err) {
      setError("An unexpected error occurred, please retry!");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {React.cloneElement(children, { onClick: onOpenModal })}

      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          onClose={() => {}}
          className="fixed inset-0 z-10 overflow-y-auto"
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl space-y-6 bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
                <div className="flex justify-between items-center">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6"
                  >
                    Create milestone
                  </Dialog.Title>
                  <button
                    onClick={onCloseModal}
                    disabled={loading}
                    className="p-1 rounded-full text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white disabled:opacity-50"
                  >
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                {error && <p className="text-center text-red-500">{error}</p>}
                <Formik
                  initialValues={{ name: "", description: "" }}
                  onSubmit={onCreateMilestone}
                >
                  {(props) => (
                    <form
                      className="space-y-4"
                      onSubmit={props.handleSubmit}
                      noValidate
                    >
                      <div className="space-y-2">
                        <label for="name-textfield">Name</label>
                        <input
                          className="relative bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-300 placeholder-gray-400 border border-gray-300 dark:border-gray-500 block w-full px-3 py-2 rounded-md focus:outline-none focus:outline-sky-500 disabled:opacity-50"
                          name="name"
                          type="text"
                          id="name-textfield"
                          placeholder="Name"
                          onChange={props.handleChange}
                          onBlur={props.handleChange}
                          value={props.values.name}
                          error={props.errors.name}
                          touched={props.errors.name && props.touched.name}
                        />
                      </div>
                      <div className="space-y-2">
                        <label for="description-textarea">Description</label>
                        <textarea
                          className="relative resize-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-300 placeholder-gray-400 border border-gray-300 dark:border-gray-500 block w-full px-3 py-2 rounded-md focus:outline-none focus:outline-sky-500 disabled:opacity-50"
                          name="description"
                          id="description-textarea"
                          type="text"
                          placeholder="Description"
                          rows="3"
                          onChange={props.handleChange}
                          onBlur={props.handleChange}
                          value={props.values.description}
                          error={props.errors.description}
                          touched={
                            props.errors.description &&
                            props.touched.description
                          }
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={!(props.isValid && props.dirty) || loading}
                        className="py-2 px-3 w-full bg-emerald-500 text-white rounded-md"
                      >
                        {!loading && <span>Create</span>}
                        {loading && (
                          <div className="w-6 h-6 border-b-2 border-white rounded-full animate-spin" />
                        )}
                      </button>
                    </form>
                  )}
                </Formik>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
