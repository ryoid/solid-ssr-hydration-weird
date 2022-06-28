import { createRoot } from "solid-js";

import setupBootStore from "./boot";

function createStore() {
  // independent stores
  const boot = setupBootStore();

  return {
    boot,
  };
}

export default createRoot(createStore);
