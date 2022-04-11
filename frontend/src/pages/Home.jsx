import { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon, PlusIcon } from "@heroicons/react/solid";
import StackTemplate from "../components/templates/StackTemplate";
import GroupCreationModal from "../components/organisms/GroupCreationModal";
import { fetchGroups } from "../api/groups";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    document.title = "Things2Do | Home";
  }, []);

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
    <StackTemplate>
      <div className="h-full bg-white dark:bg-gray-600">
        <div className="xl:container mx-auto p-4">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:items-center md:justify-between">
              <h1 className="text-2xl text-gray-800 dark:text-white">
                Task Groups
              </h1>
              <GroupCreationModal onSuccess={() => onFetchGroups()}>
                <button className="py-2 px-3 bg-emerald-500 text-white rounded-md inline-flex items-center justify-center">
                  <PlusIcon className="h-6 w-6" aria-hidden="true" />
                  <div className="ml-2">Create Group</div>
                </button>
              </GroupCreationModal>
            </div>
            <hr className="border-gray-300 dark:border-gray-400" />
            {loading && (
              <div className="flex justify-center">
                <div className="w-6 h-6 border-b-2 border-sky-500 rounded-full animate-spin" />
              </div>
            )}
            {!loading && error && (
              <p className="text-center text-red-500">{error}</p>
            )}
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
                        <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-sky-900 bg-sky-100 rounded-lg hover:bg-sky-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 flex">
                          <div className="truncate">
                            <h2 className="text-xl">{group.name}</h2>
                            {group.description && (
                              <span>{group.description}</span>
                            )}
                          </div>
                          <div>
                            <ChevronUpIcon
                              className={`${
                                open ? "transform rotate-180" : ""
                              } w-5 h-5 text-sky-500`}
                            />
                          </div>
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500" />
                      </>
                    )}
                  </Disclosure>
                </div>
              ))}
          </div>
        </div>
      </div>
    </StackTemplate>
  );
}
