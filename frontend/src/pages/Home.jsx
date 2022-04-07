import { useEffect } from "react";
import StackTemplate from "../components/templates/StackTemplate";

export default function Home() {
  useEffect(() => {
    document.title = "Things2Do | Home";
  }, []);

  return (
    <StackTemplate>
      <div className="h-full bg-white dark:bg-gray-600">
        <div className="xl:container mx-auto p-4"></div>
      </div>
    </StackTemplate>
  );
}
