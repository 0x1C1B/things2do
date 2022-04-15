import { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon, PlusIcon } from "@heroicons/react/solid";
import GroupCreationModal from "./GroupCreationModal";
import { fetchGroups } from "../../api/groups";
import TaskList from "./TaskList";

export default function GroupList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [groups, setGroups] = useState([]);

  const onFetchGroups = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetchGroups();
      setGroups(res.data);
    } catch (err) {
      setError("An unexpected error occurred, please retry!");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    onFetchGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex space-x-2 items-center justify-between">
        <h1 className="text-2xl text-gray-800 dark:text-white">Task Groups</h1>
        <div className="flex space-x-4">
          <GroupCreationModal onSuccess={() => onFetchGroups()}>
            <button>
              <div className="hidden md:inline-flex items-center justify-center py-2 px-3 bg-emerald-500 text-white rounded-md">
                <PlusIcon className="h-6 w-6" aria-hidden="true" />
                <div className="ml-2">Create Group</div>
              </div>
              <div className="md:hidden rounded-full text-emerald-500">
                <PlusIcon className="h-6 w-6" aria-hidden="true" />
              </div>
            </button>
          </GroupCreationModal>
        </div>
      </div>
      <hr className="border-gray-300 dark:border-gray-400" />
      {loading && (
        <div className="flex justify-center">
          <div className="w-6 h-6 border-b-2 border-sky-500 rounded-full animate-spin" />
        </div>
      )}
      {!loading && error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && groups.length <= 0 && (
        <p className="text-center text-gray-800 dark:text-white">
          No task groups available.
        </p>
      )}
      {!loading &&
        !error &&
        groups.map((group) => (
          <div key={group.id}>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className={`flex justify-between space-x-4 w-full px-6 py-4 font-medium text-left text-sky-900 bg-sky-100 dark:bg-sky-700 dark:text-sky-100 rounded-lg ${
                      open && "rounded-b-none"
                    } hover:bg-sky-200 focus:outline-none focus-visible:ring focus-visible:ring-sky-500 focus-visible:ring-opacity-75`}
                  >
                    <div className="w-full overflow-hidden">
                      <h2 className="text-xl truncate">{group.name}</h2>
                    </div>
                    <div>
                      <ChevronUpIcon
                        className={`${
                          open ? "transform rotate-180" : ""
                        } w-5 h-5 text-sky-500`}
                      />
                    </div>
                  </Disclosure.Button>
                  <Disclosure.Panel className="text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-700 rounded-lg rounded-t-none">
                    <div className="p-4 flex flex-col space-y-4">
                      {group.description && <p>{group.description}</p>}
                      <TaskList group={group} />
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
