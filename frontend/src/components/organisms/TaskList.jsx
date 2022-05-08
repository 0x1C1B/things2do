import { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon, PlusIcon } from "@heroicons/react/solid";
import TaskCreationModal from "./TaskCreationModal";
import MilestoneList from "./MilestoneList";
import { fetchTasksOfGroup, updateTask } from "../../api/tasks";

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

  const onToggleTaskFinishedState = async (id, finished) => {
    setError(null);

    try {
      const res = await updateTask(id, { finished: !finished });
      setTasks(
        tasks.map((task) => (task.id !== res.data.id ? task : res.data))
      );
    } catch (err) {
      setError("An unexpected error occurred, please retry!");
      throw err;
    }
  };

  useEffect(() => {
    onFetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Calculates the remaining time until a timestamp.
   *
   * @param {string|number|Date} d1 Timestamp reference
   * @returns Returns the remaining time in hours, if the timestamp has already passed, 0 is returned
   */
  const getTimeRemaining = (d1) => {
    const t1 = new Date(d1).getTime();
    const t2 = Date.now();

    if (t1 - t2 < 0) {
      return 0;
    }

    return Math.floor((t1 - t2) / (3600 * 1000));
  };

  const hasAlreadyExpired = (d1) => {
    const t1 = new Date(d1).getTime();
    const t2 = Date.now();

    return t1 - t2 <= 0;
  };

  return (
    <div className="flex flex-col space-y-4">
      <div
        className={`flex space-x-2 items-center ${
          !loading && !error && tasks.length > 0
            ? "justify-between"
            : "justify-end"
        }`}
      >
        {!loading && !error && tasks.length > 0 && (
          <p className="text-sm font-semibold text-gray-800 dark:text-white">
            Finished {tasks.filter((task) => task.finished).length} of&nbsp;
            {tasks.length} tasks
          </p>
        )}
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
                    className={`flex justify-between items-center space-x-4 w-full px-4 py-2 text-emerald-900 bg-emerald-100 dark:bg-emerald-700 dark:text-emerald-100 ${
                      open && "rounded-b-none"
                    } rounded-lg hover:bg-emerald-200 focus:outline-none focus-visible:ring focus-visible:ring-emerald-500 focus-visible:ring-opacity-75`}
                  >
                    <input
                      name="finished"
                      id="finished-checkbox"
                      type="checkbox"
                      className="w-4 h-4 min-w-fit min-h-fit"
                      checked={task.finished}
                      onChange={() =>
                        onToggleTaskFinishedState(task.id, task.finished)
                      }
                    />
                    <Disclosure.Button className="flex space-x-4 grow font-medium text-left truncate">
                      <div className="grow flex flex-col space-y-2 md:space-y-0 md:space-x-2 md:flex-row md:items-center justify-between truncate">
                        <div className="truncate">
                          <h3 className="text-lg flex items-center">
                            <span>{task.name}</span>
                            {task.priority && (
                              <span className="ml-2 inline-block px-1.5 py-0.5 text-xs rounded-lg text-center bg-sky-500 text-white">
                                {task.priority}
                              </span>
                            )}
                          </h3>
                        </div>
                        {task.expiresAt &&
                          !task.finished &&
                          !hasAlreadyExpired(task.expiresAt) &&
                          getTimeRemaining(task.expiresAt) <= 24 && (
                            <span className="max-w-fit inline-block px-1.5 py-0.5 text-xs rounded-lg text-center bg-orange-500 text-white">
                              Expires in {getTimeRemaining(task.expiresAt)}
                              &nbsp;hours
                            </span>
                          )}
                        {task.expiresAt &&
                          !task.finished &&
                          hasAlreadyExpired(task.expiresAt) && (
                            <span className="max-w-fit inline-block px-1.5 py-0.5 text-xs rounded-lg text-center bg-red-500 text-white">
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
                    <div className="p-4 flex flex-col space-y-4">
                      {task.description && <p>{task.description}</p>}
                      {task.expiresAt &&
                        !task.finished &&
                        hasAlreadyExpired(task.expiresAt) && (
                          <p className={`text-xs text-red-500`}>
                            Expired since&nbsp;
                            {new Date(task.expiresAt).toLocaleString()}
                          </p>
                        )}
                      {task.expiresAt &&
                        task.finished &&
                        hasAlreadyExpired(task.expiresAt) && (
                          <p className={`text-xs`}>
                            Expired at&nbsp;
                            {new Date(task.expiresAt).toLocaleString()}
                          </p>
                        )}
                      {task.expiresAt && !hasAlreadyExpired(task.expiresAt) && (
                        <p className="text-xs">
                          Expires at &nbsp;
                          {new Date(task.expiresAt).toLocaleString()}
                        </p>
                      )}
                      <MilestoneList task={task} />
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
    </div>
  );
}
