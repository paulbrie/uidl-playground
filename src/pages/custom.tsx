import { useEffect, useState } from "react";
import { customGenerator } from "../generators/custom";
import { createProjectPacker } from "@teleporthq/teleport-project-packer";
import store from "../store";
import sample1 from "../generators";
import CodePreview from "../components/codePreview";
import { fileTypes } from "../constants";

const generator = customGenerator();
const packer = createProjectPacker();
// @ts-ignore
packer.setGenerator(generator);

interface ProjectFiles {
  name: string;
  files: File[];
  subFolders: Subfolder[];
}

interface File {
  name: string;
  fileType: string;
  content: string;
}

interface Subfolder {
  name: string;
  files: File[];
  subFolders: Subfolder[];
}

const treeView = (data: any, onSelectFile: (file: File) => void) => {
  return (
    <>
      {Object.keys(data).map((key) => {
        if (key === "subFolders") {
          const subFolders = data[key] as Subfolder[];
          return subFolders.map((subFolder) => {
            console.log("subFolder", subFolder);
            return (
              <div>
                <div className="folder">
                  <span style={{ width: 20 }}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2.833 2.667c-.827 0-1.5.673-1.5 1.5v7.666c0 .14.025.27.061.399a1.63 1.63 0 01.046-.151L1.847 11l.358-.956.907-2.414a2.01 2.01 0 011.873-1.297H14v-.5c0-.827-.673-1.5-1.5-1.5H8.014l-1.49-1.242a1.836 1.836 0 00-1.173-.425H2.833zm2.152 4.666a1 1 0 00-.937.649l-1.67 4.45a.666.666 0 00.623.901h9.681a1 1 0 00.937-.648l1.67-4.447a.667.667 0 00-.623-.905H4.985z"></path>
                    </svg>
                  </span>
                  <span>{subFolder.name}</span>
                </div>
                {treeView(subFolder, onSelectFile)}
              </div>
            );
          });
        }

        if (key === "files") {
          const files = data[key];
          return files.map((file: File) => (
            <div className="file" onClick={() => onSelectFile(file)}>
              <div
                style={{
                  backgroundColor: "#ccc",
                  height: 16,
                  width: 12,
                  marginRight: 8
                }}
              ></div>
              {file.name}.{file.fileType}
            </div>
          ));
        }

        return null;
      })}
    </>
  );
};

export default function Custom() {
  const uidlProject = store.uidlProject.hook();
  const [files, setFiles] = useState<ProjectFiles | null>(null);
  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    type: string;
    content: string;
  }>({
    name: "",
    type: "js",
    content: "// select a file"
  });

  const onSelectFile = (file: File) => {
    setSelectedFile({
      name: file.name,
      content: file.content,
      // @ts-ignore
      type: fileTypes[file.fileType] || "javascript"
    });
  };

  useEffect(() => {
    // work with a specific sample
    store.uidlProject.next();
  }, []);

  useEffect(() => {
    packer.pack(uidlProject).then(({ success, payload }) => {
      if (success) {
        console.log(payload);
        setFiles((payload as unknown) as ProjectFiles);
      }
    });
  }, [uidlProject]);

  return (
    <div>
      <h1>Custom</h1>
      <div style={{ display: "grid", gridTemplateColumns: "240px auto" }}>
        <div>{files && treeView(files, onSelectFile)}</div>
        <div>
          <CodePreview
            fileName={""}
            fileContent={selectedFile.content}
            fileType={selectedFile.type}
          />
        </div>
      </div>
    </div>
  );
}
