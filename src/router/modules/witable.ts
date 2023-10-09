import { $t } from "@/plugins/i18n";
import { witable } from "@/router/enums";

export default {
  path: "/witable",
  redirect: "witable/index",
  meta: {
    icon: "terminalWindowLine",
    title: $t("menus.hsWItable"),
    rank: witable
  },
  children: [
    {
      path: "/witable/index",
      name: "witable",
      component: () => import("@/views/witable/index.vue"),
      meta: {
        title: $t("menus.hsWItable")
      }
    }
  ]
} as RouteConfigsTable;
