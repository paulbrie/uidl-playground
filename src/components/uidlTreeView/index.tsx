import { ProjectUIDL } from "@teleporthq/teleport-types";
import { uuid } from "uuidv4";
import Node from "./uidlNode";
export default function UidlTreeView({
  projectUidl,
  onSelect
}: {
  projectUidl: ProjectUIDL;
  onSelect: (node: any) => void;
}) {
  const nodesList: {
    [key: string]: {
      key: string;
      node: any;
      nodeId: string;
      parentData: any;
      parentNodeId: string;
      nodesList: any;
    };
  } = {};

  const traverse = (data: {
    key: string;
    node: any;
    nodeId: string;
    parentData: any;
    parentNodeId: string;
    nodesList: typeof nodesList;
  }) => {
    nodesList[data.nodeId] = {
      node: data.node,
      key: data.key,
      nodeId: data.nodeId,
      parentData: data,
      parentNodeId: data.parentNodeId,
      nodesList: data.nodesList
    };

    return (
      <Node onClick={onSelect} data={data}>
        {Object.keys(data.node).map((key, index) => {
          if (typeof data.node[key] === "object") {
            return traverse({
              key,
              node: data.node[key],
              nodeId: uuid(),
              parentData: data,
              parentNodeId: data.nodeId,
              nodesList: data.nodesList
            });
          } else {
            return (
              <Node
                onClick={onSelect}
                data={{
                  key,
                  node: data.node[key],
                  nodeId: uuid(),
                  parentData: data,
                  parentNodeId: data.nodeId,
                  nodesList: data.nodesList
                }}
              ></Node>
            );
          }
        })}
      </Node>
    );
  };

  console.log(nodesList);

  return (
    <div>
      {traverse({
        node: projectUidl,
        key: "root",
        parentData: null,
        nodeId: uuid(),
        parentNodeId: "",
        nodesList
      })}
    </div>
  );
}
