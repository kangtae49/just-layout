import { ContainerModule, type Factory  } from "inversify";
import { JUST_LAYOUT_TYPES } from "./justLayout.constants.ts";
import { JustLayoutService } from "./justLayout.service";
import { JustLayoutStore } from "./justLayout.store";
import {container, storeLayout} from "./inversify.config.ts";

// const storeCache = new Map<string, JustLayoutStore>();


export const justLayoutModule = new ContainerModule(({bind}) => {
  bind(JUST_LAYOUT_TYPES.JustLayoutService).to(JustLayoutService).inSingletonScope();

  bind(JUST_LAYOUT_TYPES.JustLayoutStore).to(JustLayoutStore).inTransientScope();

  bind<Factory<JustLayoutStore>>(JUST_LAYOUT_TYPES.JustLayoutFactory)
    .toFactory((_context) => {
      return (id: string) => {
        if (!storeLayout.has(id)) {
          const newStore = container.get<JustLayoutStore>(JUST_LAYOUT_TYPES.JustLayoutStore);
          storeLayout.set(id, newStore);
        }
        return storeLayout.get(id)!;
      }
    })
});