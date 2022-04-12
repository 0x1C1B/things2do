import { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon, PlusIcon } from "@heroicons/react/solid";
import TaskCreationModal from "./TaskCreationModal";
import { fetchTasksOfGroup } from "../../api/tasks";

export default function TaskList({ group }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);

  const onFetchTasks = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetchTasksOfGroup(group.id);
      setTasks(res.data);
    } catch (err) {
      setError("An unexpected error occurred, please retry!");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    onFetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTimeRemainingInDays = (d1) => {
    const t1 = new Date(d1).getTime();
    const t2 = Date.now();

    return Math.floor((t1 - t2) / (24 * 3600 * 1000));
  };

  const hasAlreadyExpired = (d1) => {
    const t1 = new Date(d1).getTime();
    const t2 = Date.now();

    return t1 - t2 <= 0;
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex space-x-2 items-center justify-end">
        <div className="flex space-x-4">
          <TaskCreationModal
            groupId={group.id}
            onSuccess={() => onFetchTasks()}
          >
            <button>
              <div className="hidden md:inline-flex items-center justify-center py-2 px-3 bg-emerald-500 text-white rounded-md">
                <PlusIcon className="h-6 w-6" aria-hidden="true" />
                <div className="ml-2">Create Task</div>
              </div>
              <div className="md:hidden rounded-full text-emerald-500">
                <PlusIcon className="h-6 w-6" aria-hidden="true" />
              </div>
            </button>
          </TaskCreationModal>
        </div>
      </div>
      <hr className="border-gray-300 dark:border-gray-400" />
      {loading && (
        <div className="flex justify-center">
          <div className="w-6 h-6 border-b-2 border-sky-500 rounded-full animate-spin" />
        </div>
      )}
      {!loading && error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && tasks.length <= 0 && (
        <p className="text-center text-gray-800 dark:text-white">
          No tasks available.
        </p>
      )}
      {!loading &&
        !error &&
        tasks.map((task) => (
          <div key={task.id}>
            <Disclosure>
              {({ open }) => (
                <>
                  <div
                    className={`flex justify-between items-center space-x-4 w-full px-4 py-2 text-emerald-900 bg-emerald-100 ${
                      open && "rounded-b-none"
                    } rounded-lg hover:bg-emerald-200 focus:outline-none focus-visible:ring focus-visible:ring-emerald-500 focus-visible:ring-opacity-75`}
                  >
                    <input
                      name="finished"
                      id="finished-checkbox"
                      type="checkbox"
                      className="w-4 h-4"
                      checked={task.finished}
                      onChange={() => {}}
                    />
                    <Disclosure.Button className="flex space-x-4 grow font-medium text-left truncate">
                      <div className="grow flex flex-col space-y-2 md:space-y-0 md:space-x-2 md:flex-row md:items-center justify-between truncate">
                        <div className="truncate">
                          <h2 className="text-xl flex items-center">
                            <span>{task.name}</span>
                            {task.priority && (
                              <span class="ml-2 inline-block px-1.5 py-0.5 text-xs rounded-lg text-center bg-sky-500 text-white">
                                {task.priority}
                              </span>
                            )}
                          </h2>
                          {task.description && (
                            <div className="text-sm">{task.description}</div>
                          )}
                        </div>
                        {task.expiresAt &&
                          !hasAlreadyExpired(task.expiresAt) &&
                          getTimeRemainingInDays(task.expiresAt) <= 1 && (
                            <span class="max-w-fit inline-block px-1.5 py-0.5 text-xs rounded-lg text-center bg-orange-500 text-white">
                              Expires soon
                            </span>
                          )}
                        {task.expiresAt &&
                          !task.finished &&
                          hasAlreadyExpired(task.expiresAt) && (
                            <span class="max-w-fit inline-block px-1.5 py-0.5 text-xs rounded-lg text-center bg-red-500 text-white">
                              Expired
                            </span>
                          )}
                      </div>
                      <div>
                        <ChevronUpIcon
                          className={`${
                            open ? "transform rotate-180" : ""
                          } w-5 h-5 text-emerald-500`}
                        />
                      </div>
                    </Disclosure.Button>
                  </div>
                  <Disclosure.Panel className="text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-800 rounded-lg rounded-t-none">
                    <div className="p-4"></div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
    </div>
  );
}
