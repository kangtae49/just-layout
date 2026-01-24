import "reflect-metadata";
import {Container} from "inversify";
import {justLayoutModule} from "./justLayout.module.ts";
import {toJS} from "mobx";

const container = new Container();


const appModules = [
  justLayoutModule,
]
container.load(
  ...appModules
);

const storeCache = new Map<string, any>();


// if (process.env.NODE_ENV === 'development') {
//   (window as any).container = container;
//   (window as any).toJS = toJS;
// }


// const getF = (facId: string, storeId: string) => {
//   return container.get(Symbol.for(facId))(storeId)
// }

(window as any).storeCache = storeCache;
(window as any).toJS = toJS;
// toJS(storeCache.get('LAYOUT_ID').layout)


export { container, storeCache};