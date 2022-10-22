import store from "../store";
import UidlTreeView from "../components/uidlTreeView";

export default function UidlVisualiser() {
  const projectUidl = store.uidlProject.hook();

  return (
    <div>
      <h1>UIDL Visualiser</h1>
      <UidlTreeView projectUidl={projectUidl} />
    </div>
  );
}
