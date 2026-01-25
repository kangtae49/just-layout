import "reflect-metadata";
import {Container} from "inversify";
import {toJS} from "mobx";
import {justLayoutModule} from "./lib";

const container = new Container();


const appModules = [
  justLayoutModule,
]
container.load(
  ...appModules
);

// const storeLayout = new Map<string, any>();


// if (process.env.NODE_ENV === 'development') {
//   (window as any).container = container;
//   (window as any).toJS = toJS;
// }


// const getF = (facId: string, storeId: string) => {
//   return container.get(Symbol.for(facId))(storeId)
// }

// (window as any).storeLayout = storeLayout;
(window as any).toJS = toJS;
// toJS(storeCache.get('LAYOUT_ID').layout)


// export { container, storeLayout};
export { container };
