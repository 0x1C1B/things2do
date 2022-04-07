import { Fragment } from "react";
import { Popover, Transition, Switch } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import themeSlice from "../../store/slices/theme";

import Logo from "../../assets/images/logo.svg";
import LogoTextLight from "../../assets/images/logo-text-light.svg";
import LogoTextDark from "../../assets/images/logo-text-dark.svg";

export default function Navbar() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const onThemeToggle = (value) => {
    dispatch(themeSlice.actions.setDarkMode(value));
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800">
      <div className="xl:container mx-auto px-4">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <Link to="/">
              <div className="flex-shrink-0 flex items-center">
                <img
                  className="block lg:hidden h-8 w-auto"
                  src={Logo}
                  alt="Logo"
                />
                <img
                  className="hidden lg:block lg:dark:hidden h-8 w-auto"
                  src={LogoTextDark}
                  alt="Logo"
                />
                <img
                  className="hidden lg:dark:block h-8 w-auto"
                  src={LogoTextLight}
                  alt="Logo"
                />
              </div>
            </Link>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Popover className="relative">
              {() => (
                <>
                  <Popover.Button className="p-1 rounded-full text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">
                    <DotsVerticalIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute shadow-md border dark:border-gray-900 rounded-md z-10 mt-3 w-screen max-w-xs sm:max-w-sm right-0 bg-white dark:bg-gray-600 text-gray-800 dark:text-white">
                      <div className="p-2 text-gray-800 dark:text-white flex flex-col space-y-2">
                        <div className="flex justify-between items-center p-2 rounded">
                          <div className="text-sm">Dark Mode</div>
                          <div>
                            <Switch
                              checked={darkMode}
                              onChange={onThemeToggle}
                              className={`relative inline-flex flex-shrink-0 h-[24px] w-[44px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75 ${
                                darkMode
                                  ? "bg-sky-500"
                                  : "bg-gray-100 dark:bg-gray-800"
                              }`}
                            >
                              <span className="sr-only">Use setting</span>
                              <span
                                aria-hidden="true"
                                className={`pointer-events-none inline-block h-[20px] w-[20px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200 ${
                                  darkMode
                                    ? "translate-x-[20px]"
                                    : "translate-x-0"
                                }`}
                              />
                            </Switch>
                          </div>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
}
