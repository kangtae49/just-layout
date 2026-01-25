import { useState } from "react";
import { useInjection } from "inversify-react";
import type { JustLayoutFactory } from "./justLayout.types";
import {JUST_LAYOUT_TYPES} from "./justLayout.constants.ts";

export const useJustLayoutStore = (id: string) => {
  const factory = useInjection<JustLayoutFactory>(JUST_LAYOUT_TYPES.JustLayoutFactory);
  const [store] = useState(() => {
    return factory(id);
  });

  return store;
};