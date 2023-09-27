<script setup lang="ts">
import { useIntervalFn } from "@vueuse/core";
import { ref, computed, watch, type Ref } from "vue";
import { useAppStoreHook } from "@/store/modules/app";
import {
  delay,
  useDark,
  useECharts,
  type EchartOptions
} from "@pureadmin/utils";

const { isDark } = useDark();

const theme: EchartOptions["theme"] = computed(() => {
  return isDark.value ? "dark" : "default";
});

const lineChartRef = ref<HTMLDivElement | null>(null);
const { setOptions, getInstance, resize } = useECharts(
  lineChartRef as Ref<HTMLDivElement>,
  { theme }
);

const xData = (() => {
  const data: any[] = [];
  for (let i = 1; i < 31; i++) {
    data.push(`${i}日`);
  }
  return data;
})();

setOptions(
  {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    grid: {
      bottom: "20px",
      right: "10px"
    },
    legend: {
      //@ts-expect-error
      right: true,
      data: ["实际", "计划"]
    },
    calculable: true,
    xAxis: [
      {
        triggerEvent: true,
        type: "category",
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        data: xData
      }
    ],
    yAxis: [
      {
        triggerEvent: true,
        type: "value",
        splitLine: {
          show: false
        },
        axisLine: {
          show: true
        }
      }
    ],
    dataZoom: [
      {
        type: "slider",
        show: false,
        realtime: true,
        startValue: 0,
        endValue: 24
      }
    ],
    series: [
      {
        name: "实际",
        type: "line",
        symbolSize: 10,
        symbol: "circle",
        color: "#f56c6c",
        markPoint: {
          label: {
            color: "#fff"
          },
          data: [
            {
              type: "max",
              name: "最大值"
            },
            {
              type: "min",
              name: "最小值"
            }
          ]
        },
        data: [
          9, 17, 24, 10, 19, 16, 13, 35, 27, 20, 21, 20, 14, 12, 9, 7, 9, 22,
          20, 32, 36, 33, 22, 21, 31, 24, 26, 21, 24, 20
        ]
      },
      {
        name: "计划",
        type: "line",
        symbolSize: 10,
        symbol: "circle",
        color: "#53a7ff",
        markPoint: {
          label: {
            color: "#fff"
          },
          data: [
            {
              type: "max",
              name: "最大值"
            },
            {
              type: "min",
              name: "最小值"
            }
          ]
        },
        data: [
          21, 33, 22, 31, 31, 34, 31, 32, 34, 40, 41, 34, 34, 38, 40, 32, 34,
          35, 34, 35, 40, 43, 35, 35, 40, 33, 34, 31, 32, 42, 42
        ]
      }
    ],
    addTooltip: true
  },
  {
    name: "click",
    callback: params => {
      console.log("click", params);
    }
  },
  {
    name: "contextmenu",
    callback: params => {
      console.log("contextmenu", params);
    }
  },
  // 点击空白处
  {
    type: "zrender",
    name: "click",
    callback: params => {
      console.log("点击空白处", params);
    }
  }
);

let a = 1;
useIntervalFn(() => {
  if (a == xData.length - 24) {
    a = 0;
  }
  getInstance()!.dispatchAction({
    type: "dataZoom",
    startValue: a,
    endValue: a + 24
  });
  a++;
}, 2000);

watch(
  () => useAppStoreHook().getSidebarStatus,
  () => {
    delay(600).then(() => resize());
  }
);
</script>

<template>
  <div ref="lineChartRef" style="width: 100%; height: 35vh" />
</template>
