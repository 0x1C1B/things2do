import { useEffect } from "react";
import StackTemplate from "../components/templates/StackTemplate";
import GroupList from "../components/organisms/GroupList";

export default function Home() {
  useEffect(() => {
    document.title = "Things2Do | Home";
  }, []);

  return (
    <StackTemplate>
      <div className="h-full bg-white dark:bg-gray-600">
        <div className="xl:container mx-auto p-4">
          <GroupList />
        </div>
      </div>
    </StackTemplate>
  );
}
