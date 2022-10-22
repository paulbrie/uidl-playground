import { createProjectGenerator } from "@teleporthq/teleport-project-generator";
import { createReactComponentGenerator } from "@teleporthq/teleport-component-generator-react";
import { CustomProjectMapping } from "./mapping";
import { ReactStyleVariation } from "@teleporthq/teleport-types";

// template
// https://github.com/teleporthq/teleport-code-generators/blob/development/packages/teleport-project-generator-next/src/index.ts

const customGenerator = () => {
  const generator = createProjectGenerator({
    id: "custom-generator",
    style: ReactStyleVariation.CSS,
    pages: {
      generator: createReactComponentGenerator,
      path: ["pages"],
      mappings: [CustomProjectMapping],
      options: {
        useFileNameForNavigation: true
      }
    },
    components: {
      generator: createReactComponentGenerator,
      mappings: [CustomProjectMapping],
      path: ["components"]
    },
    static: {
      prefix: "",
      path: ["public"]
    }
  });

  return generator;
};

export { customGenerator, CustomProjectMapping };
