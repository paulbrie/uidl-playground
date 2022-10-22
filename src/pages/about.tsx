import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import about from "../md/about.md";

export default function About() {
  const [md, setMd] = useState("");
  useEffect(() => {
    fetch(about)
      .then((res) => res.text())
      .then(setMd);
  }, []);
  return (
    <div>
      <Markdown children={md}></Markdown>
    </div>
  );
}
