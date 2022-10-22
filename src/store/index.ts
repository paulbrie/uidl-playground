import { useState, useEffect } from "react";
import { Subject } from "subjecto";
import { ProjectType, ProjectUIDL } from "@teleporthq/teleport-types";
import defaultProject from "../uidl/project.json";

Subject.prototype.hook = function () {
  // eslint-disable-next-line
  const [value, setValue] = useState(this.value);
  // eslint-disable-next-line
  useEffect(() => this.subscribe(setValue).unsubscribe, []);
  return value;
};

const store = {
  projectType: new Subject<ProjectType>(ProjectType.REACT),
  view: new Subject("UIDL"),
  uidlProject: new Subject<ProjectUIDL>(
    (defaultProject as unknown) as ProjectUIDL
  )
};

export default store;
