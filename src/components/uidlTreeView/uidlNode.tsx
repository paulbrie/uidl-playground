import React, { ReactNode, useState } from "react";
export default function Node({
  data,
  children
}: {
  data: {
    key: string;
    node: any;
    nodeId: string;
    parentData: any;
    parentNodeId: string;
    nodesList: {
      [key: string]: {
        key: string;
        node: any;
        nodeId: string;
        parentData: any;
        parentNodeId: string;
      };
    };
  };
  children?: ReactNode;
  onClick: (node: any) => void;
}) {
  debugger;
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = (ev: React.MouseEvent) => {
    ev.stopPropagation();
    setCollapsed(!collapsed);
  };

  const getPath = (node: any = data, path: string[] = []) => {
    path.push(data.nodeId);

    /*if (data.parentData) {
      getPath(data.parentData, path);
    }*/
    return path;
  };

  return (
    <div
      key={data.nodeId}
      style={{
        marginLeft: 16,
        borderLeft: "solid 1px #cccccc80",
        position: "relative"
      }}
    >
      {typeof data.node !== "string" && (
        <svg
          onClick={toggleCollapse}
          style={{
            height: 12,
            position: "absolute",
            top: 5,
            left: -5,
            transform: collapsed ? "rotate(-90deg)" : ""
          }}
          viewBox="0 0 15 15"
          fill="#aaaaaa"
        >
          <path d="M0 5l6 6 6-6z"></path>
        </svg>
      )}
      <div style={{ minHeight: 32, marginLeft: 8 }}>
        <span className="objectKey" onClick={() => console.log(getPath())}>
          {data.key}
        </span>
        {typeof data?.node === "string" ? (
          <span className="str">{data.node}</span>
        ) : (
          <>
            <span className="objectType">
              {data?.node?.length ? `arr (${data.node.length})` : "{}"}
            </span>
          </>
        )}
        <span>{/*data.nodeId*/}</span>
      </div>
      <div style={{ display: collapsed ? "none" : "" }}>{children || null}</div>
    </div>
  );
}
