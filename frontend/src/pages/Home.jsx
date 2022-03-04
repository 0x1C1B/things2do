import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "Things2Do | Home";
  }, []);

  return <></>;
}
