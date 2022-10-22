import { packProject } from "@teleporthq/teleport-code-generator";
import {
  ProjectUIDL,
  GeneratedFolder,
  ProjectType
} from "@teleporthq/teleport-types";

export const parse = async (
  projectUIDL: ProjectUIDL,
  projectType: ProjectType
) => {
  const { payload } = await packProject(projectUIDL, {
    projectType
  });

  const list: Record<string, string> = {};
  const buildFilesList = (payload: GeneratedFolder, folderName: string) => {
    payload.files.forEach((file) => {
      list[folderName + file.name + "." + file.fileType] = file.content;
    });

    payload.subFolders.forEach((folder) => {
      buildFilesList(folder, folderName + folder.name + "/");
    });
  };

  buildFilesList(payload as GeneratedFolder, "");

  return list;
};
