import JsonView from "react-json-view";
import projectUIDL from "../uidl/project.json";
export default function JsonViewer() {
  return (
    <div>
      <JsonView src={projectUIDL} />
    </div>
  );
}
