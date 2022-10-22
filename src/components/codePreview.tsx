import Editor from "@monaco-editor/react";

export default function CodePreview({
  fileName,
  fileContent,
  fileType
}: {
  fileName: string;
  fileContent: string;
  fileType: string;
}) {
  return (
    <div>
      {fileName && (
        <span style={{ marginBottom: 16, display: "flex" }}>{fileName}</span>
      )}
      <div style={{ height: 480, border: "solid 1px #cccccc80" }}>
        <Editor value={fileContent} language={fileType} />
      </div>
    </div>
  );
}
