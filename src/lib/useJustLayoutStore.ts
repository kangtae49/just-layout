import { useState } from "react";
import { container } from "./inversify.config";
import type { JustLayoutFactory } from "./justLayout.types";
import {JUST_LAYOUT_TYPES} from "./justLayout.constants.ts";

export const useJustLayoutStore = (id: string) => {
  const [store] = useState(() => {
    const factory = container.get<JustLayoutFactory>(JUST_LAYOUT_TYPES.JustLayoutFactory);
    return factory(id);
  });

  return store;
};