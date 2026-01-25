import {ContainerModule, type Factory, ResolutionContext} from "inversify";
import { JUST_LAYOUT_TYPES } from "./justLayout.constants.ts";
import { JustLayoutService } from "./justLayout.service";
import { JustLayoutStore } from "./justLayout.store";
import {container, storeLayout} from "./inversify.config.ts";

// const storeCache = new Map<string, JustLayoutStore>();


export const justLayoutModule = new ContainerModule(({bind}) => {

  bind(JUST_LAYOUT_TYPES.JustLayoutService).to(JustLayoutService).inSingletonScope();

  bind(JUST_LAYOUT_TYPES.JustLayoutStore).to(JustLayoutStore).inTransientScope();

  bind<Map<string, JustLayoutStore>>(JUST_LAYOUT_TYPES.JustLayoutStoreCacheMap).toConstantValue(new Map());
  bind<Factory<JustLayoutStore>>(JUST_LAYOUT_TYPES.JustLayoutFactory)
    .toFactory((context: ResolutionContext) => {
      const cacheMap = context.get<Map<string, JustLayoutStore>>(JUST_LAYOUT_TYPES.JustLayoutStoreCacheMap);
      return (id: string) => {
        if (!cacheMap.has(id)) {
          const newStore = context.get<JustLayoutStore>(JUST_LAYOUT_TYPES.JustLayoutStore)
          // const newStore = container.get<JustLayoutStore>(JUST_LAYOUT_TYPES.JustLayoutStore);
          cacheMap.set(id, newStore);
        }
        return cacheMap.get(id)!;
      }
    })
});