import { For } from "solid-js";
import store from "../store";

export enum Tab {
  TOP = "Top",
  ALL = "All",
  NEW = "New",
  STARRED = "Starred",
}

const DashboardPage = () => {
  const {
    boot: { hasBootData, tradingPairs, trendingList },
  } = store;
  return (
    <div>
      <Show when={hasBootData()} fallback={<div>Loading tabs</div>}>
        <div style={{ display: 'flex' }}>
          <For each={Object.values(Tab)}>{(tab) => <div>{tab}</div>}</For>
        </div>
      </Show>

      <div>Hello World</div>
    </div>
  );
};

export default DashboardPage;
