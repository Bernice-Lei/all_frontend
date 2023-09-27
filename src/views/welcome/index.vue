<script setup lang="ts">
import dayjs from "dayjs";
import MdEditor from "md-editor-v3";
import Bar from "./components/Bar.vue";
import Pie from "./components/Pie.vue";
import Line from "./components/Line.vue";
import TypeIt from "@/components/ReTypeit";
import { useWindowSize } from "@vueuse/core";
import { ref, computed, markRaw } from "vue";
import Github from "./components/Github.vue";
import { randomColor } from "@pureadmin/utils";
import { useRenderFlicker } from "@/components/ReFlicker";

defineOptions({
  name: "Welcome"
});

const list = ref();
const loading = ref<boolean>(true);
// const { version } = __APP_INFO__.pkg;
const titleClass = computed(() => {
  return ["text-base", "font-medium"];
});

const { height } = useWindowSize();

// 假设你有自己的数据数组，命名为myData
const myData = [
  { body: "分配款号", published_at: "2023-09-21" },
  { body: "出ToolPlan", published_at: "2023-09-22" },
  { body: "排色方需求表", published_at: "2023-09-23" },
  { body: "出MDS", published_at: "2023-09-24" },
  { body: "录入AS400", published_at: "2023-09-25" },
  { body: "排试模表", published_at: "2023-09-26" },
  { body: "试模", published_at: "2023-09-27" },
  { body: "出试模报告和WI表", published_at: "2023-09-28" },
  { body: "排放模表", published_at: "2023-09-29" },
  { body: "放模", published_at: "2023-09-30" },
  { body: "出放模报告", published_at: "2023-09-31" }
  // 更多的对象...
];

setTimeout(() => {
  loading.value = !loading.value;
}, 800);

// 将原始代码中的list.value替换为你自己的数组变量
list.value = myData.map(v => {
  return {
    content: v.body,
    timestamp: dayjs(v.published_at).format("YYYY/MM/DD"),
    icon: markRaw(
      useRenderFlicker({
        background: randomColor({ type: "hex" }) as string
      })
    )
  };
});
</script>

<template>
  <div>
    <el-row :gutter="24">
      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="12"
        :xl="12"
        class="mb-[18px]"
        v-motion
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 200
          }
        }"
      >
        <el-card
          shadow="never"
          :style="{ height: `calc(${height}px - 35vh - 250px)` }"
        >
          <template #header>
            <a
              :class="titleClass"
              href="https://github.com/pure-admin/vue-pure-admin/releases"
              target="_black"
            >
              <!-- <TypeIt
                :className="'type-it2'"
                :values="[`新产品开发流程（当前阶段 v${version}）`]"
                :cursor="false"
                :speed="60"
              /> -->
              <TypeIt
                :className="'type-it2'"
                :values="[`新产品开发流程（当前阶段: 出ToolPlan）`]"
                :cursor="false"
                :speed="60"
              />
            </a>
          </template>
          <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <el-scrollbar :height="`calc(${height}px - 35vh - 340px)`">
                <el-timeline v-show="list?.length > 0">
                  <el-timeline-item
                    v-for="(item, index) in list"
                    :key="index"
                    :icon="item.icon"
                    :timestamp="item.timestamp"
                  >
                    <md-editor v-model="item.content" preview-only />
                  </el-timeline-item>
                </el-timeline>
                <el-empty v-show="list?.length === 0" />
              </el-scrollbar>
            </template>
          </el-skeleton>
        </el-card>
      </el-col>

      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="12"
        :xl="12"
        class="mb-[18px]"
        v-motion
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 200
          }
        }"
      >
        <el-card
          shadow="never"
          :style="{ height: `calc(${height}px - 35vh - 250px)` }"
        >
          <template #header>
            <a
              :class="titleClass"
              href="https://github.com/xiaoxian521"
              target="_black"
            >
              <TypeIt
                :className="'type-it1'"
                :values="['产品信息']"
                :cursor="false"
                :speed="120"
              />
            </a>
          </template>
          <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <el-scrollbar :height="`calc(${height}px - 35vh - 340px)`">
                <Github />
              </el-scrollbar>
            </template>
          </el-skeleton>
        </el-card>
      </el-col>

      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="8"
        :xl="8"
        class="mb-[18px]"
        v-motion
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 400
          }
        }"
      >
        <el-card shadow="never">
          <template #header>
            <a
              :class="titleClass"
              href="https://github.com/pure-admin/vue-pure-admin"
              target="_black"
            >
              <TypeIt
                :className="'type-it4'"
                :values="['每日试模计划与实际情况']"
                :cursor="false"
                :speed="120"
              />
            </a>
          </template>
          <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <Line />
            </template>
          </el-skeleton>
        </el-card>
      </el-col>

      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="8"
        :xl="8"
        class="mb-[18px]"
        v-motion
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 400
          }
        }"
      >
        <el-card shadow="never">
          <template #header>
            <a
              :class="titleClass"
              href="https://github.com/pure-admin/vue-pure-admin"
              target="_black"
            >
              <TypeIt
                :className="'type-it3'"
                :values="['今日试模完成率']"
                :cursor="false"
                :speed="120"
              />
            </a>
          </template>
          <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <Pie />
            </template>
          </el-skeleton>
        </el-card>
      </el-col>

      <el-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="8"
        :xl="8"
        class="mb-[18px]"
        v-motion
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 400
          }
        }"
      >
        <el-card shadow="never">
          <template #header>
            <a
              :class="titleClass"
              href="https://github.com/pure-admin/vue-pure-admin"
              target="_black"
            >
              <TypeIt
                :className="'type-it5'"
                :values="['吨位机台放模情况']"
                :cursor="false"
                :speed="120"
              />
            </a>
          </template>
          <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <Bar />
            </template>
          </el-skeleton>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-timeline-item) {
  margin: 6px 0 0 6px;
}

.main-content {
  margin: 20px 20px 0 !important;
}
</style>
