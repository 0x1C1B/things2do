import { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon, PlusIcon } from "@heroicons/react/solid";
import MilestoneCreationModal from "./MilestoneCreationModal";
import { fetchMilestonesOfTask, updateMilestone } from "../../api/milestones";

export default function MilestoneList({ task }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [milestones, setMilestones] = useState([]);

  const onFetchMilestones = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetchMilestonesOfTask(task.id);
      setMilestones(res.data);
    } catch (err) {
      setError("An unexpected error occurred, please retry!");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const onToggleMilestoneFinishedState = async (id, finished) => {
    setError(null);

    try {
      const res = await updateMilestone(id, { finished: !finished });
      setMilestones(
        milestones.map((milestone) =>
          milestone.id !== res.data.id ? milestone : res.data
        )
      );
    } catch (err) {
      setError("An unexpected error occurred, please retry!");
      throw err;
    }
  };

  useEffect(() => {
    onFetchMilestones();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      <div
        className={`flex space-x-2 items-center ${
          !loading && !error && milestones.length > 0
            ? "justify-between"
            : "justify-end"
        }`}
      >
        {!loading && !error && milestones.length > 0 && (
          <p className="text-sm font-semibold text-gray-800 dark:text-white">
            Finished{" "}
            {milestones.filter((milestone) => milestone.finished).length}{" "}
            of&nbsp;
            {milestones.length} milestones
          </p>
        )}
        <div className="flex space-x-4">
          <MilestoneCreationModal
            taskId={task.id}
            onSuccess={() => onFetchMilestones()}
          >
            <button>
              <div className="hidden md:inline-flex items-center justify-center py-2 px-3 bg-emerald-500 text-white rounded-md">
                <PlusIcon className="h-6 w-6" aria-hidden="true" />
                <div className="ml-2">Create Milestone</div>
              </div>
              <div className="md:hidden rounded-full text-emerald-500">
                <PlusIcon className="h-6 w-6" aria-hidden="true" />
              </div>
            </button>
          </MilestoneCreationModal>
        </div>
      </div>
      <hr className="border-gray-300 dark:border-gray-400" />
      {loading && (
        <div className="flex justify-center">
          <div className="w-6 h-6 border-b-2 border-sky-500 rounded-full animate-spin" />
        </div>
      )}
      {!loading && error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && milestones.length <= 0 && (
        <p className="text-center text-gray-800 dark:text-white">
          No milestones available.
        </p>
      )}
      {!loading &&
        !error &&
        milestones.map((milestone) => (
          <div key={milestone.id}>
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
                      checked={milestone.finished}
                      onChange={() =>
                        onToggleMilestoneFinishedState(
                          milestone.id,
                          milestone.finished
                        )
                      }
                    />
                    <Disclosure.Button className="flex space-x-4 grow font-medium text-left truncate">
                      <div className="grow flex flex-col space-y-2 md:space-y-0 md:space-x-2 md:flex-row md:items-center justify-between truncate">
                        <div className="truncate">
                          <h3 className="text-lg flex items-center">
                            <span>{milestone.name}</span>
                          </h3>
                        </div>
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
                  <Disclosure.Panel className="text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-700 rounded-lg rounded-t-none">
                    <div className="p-4 flex flex-col space-y-4">
                      {milestone.description && <p>{milestone.description}</p>}
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
