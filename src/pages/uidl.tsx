import JsonView from "react-json-view";
import defaultProject from "../uidl/project.json";
import store from "../store";
import { useRef, useState } from "react";
import { ProjectUIDL } from "@teleporthq/teleport-types";

export default function UidlPage() {
  const [error, setError] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  const [uploadView, setUploadView] = useState(false);
  const uidlProject = store.uidlProject.hook();
  const textareaRef = useRef<HTMLTextAreaElement>(null!);

  const onUploadClick = () => {
    if (!uploadView) {
      setUploadView(true);
    } else {
      try {
        store.uidlProject.next(
          (JSON.parse(textareaRef.current.value) as unknown) as ProjectUIDL
        );
        setUploadView(false);
        setError("");
      } catch (error) {
        // @ts-ignore
        setError(error + "");
      }
    }
  };

  const useDefaultUidl = () => {
    store.uidlProject.next((defaultProject as unknown) as ProjectUIDL);
    setUploadView(false);
    setError("");
  };

  const editCurrentUidl = () => {
    textareaRef.current.value = JSON.stringify(
      store.uidlProject.value,
      null,
      2
    );
    setUploadView(true);
    setError("");
  };

  return (
    <div>
      <div style={{ marginBottom: 16, gap: 8, display: "flex" }}>
        <button onClick={onUploadClick}>
          {uploadView ? "Save" : "Upload UIDL"}
        </button>
        {!uploadView && (
          <>
            <button onClick={useDefaultUidl}>Use default UIDL</button>
            <button onClick={editCurrentUidl}>Edit current UIDL</button>
            <button onClick={() => setCollapsed(true)}>Collapse</button>
            <button onClick={() => setCollapsed(false)}>Expand</button>
          </>
        )}
        {uploadView && (
          <button onClick={() => setUploadView(false)}>Cancel</button>
        )}
      </div>
      {error && (
        <div style={{ marginBottom: 16 }} className="error">
          {error}
        </div>
      )}
      <textarea
        ref={textareaRef}
        style={{
          width: "100%",
          height: 320,
          display: uploadView ? "" : "none"
        }}
        placeholder="Paste your UIDL here"
      ></textarea>
      {!uploadView && <JsonView collapsed={collapsed} src={uidlProject} />}
    </div>
  );
}
