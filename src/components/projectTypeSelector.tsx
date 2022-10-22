import { ProjectType } from "@teleporthq/teleport-types";
import { $enum } from "ts-enum-util";

const ProjectTypeSelector = ({
  onChange,
  selected
}: {
  onChange: (projectType: ProjectType) => void;
  selected: ProjectType;
}) => {
  return (
    <select
      onChange={(ev) => {
        // @ts-ignore
        const key = $enum(ProjectType).indexOfValue(ev.currentTarget.value);
        onChange(ProjectType[Array.from($enum(ProjectType).keys())[key]]);
      }}
    >
      {$enum(ProjectType)
        .getValues()
        .map((value, index) => {
          return (
            <option
              key={index}
              value={value}
              selected={
                $enum(ProjectType).indexOfValue(value) ===
                ((selected as unknown) as number)
              }
            >
              {value}
            </option>
          );
        })}
    </select>
  );
};

export default ProjectTypeSelector;
