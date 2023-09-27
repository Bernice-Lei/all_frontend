import TypeIt from "@/components/ReTypeit";
import Iphone from "@iconify-icons/ep/iphone";
import Notebook from "@iconify-icons/ep/notebook";
import User from "@iconify-icons/ri/user-3-fill";
import Doll from "@iconify-icons/fluent-emoji-high-contrast/nesting-dolls";

export function useColumns() {
  const columnsA = [
    {
      labelRenderer: () => (
        <div class="flex items-center">
          <el-icon>
            <iconify-icon-offline icon={Doll} />
          </el-icon>
          Toy-No.
        </div>
      ),
      value: "HTK38"
    },
    {
      labelRenderer: () => (
        <div class="flex items-center">
          <el-icon>
            <iconify-icon-offline icon={User} />
          </el-icon>
          TE工程师
        </div>
      ),
      value: "Alex"
    },
    {
      labelRenderer: () => (
        <div class="flex items-center">
          <el-icon>
            <iconify-icon-offline icon={Iphone} />
          </el-icon>
          手机号
        </div>
      ),
      value: "11111111111"
    }
  ];

  const columnsB = [
    {
      labelRenderer: () => (
        <div class="flex items-center">
          <el-icon>
            <iconify-icon-offline icon={Notebook} />
          </el-icon>
          异常描述
        </div>
      ),
      cellRenderer: () => (
        <TypeIt
          className={"github"}
          values={["色方有误，颜色不对"]}
          cursor={false}
          speed={100}
        />
      )
    }
  ];

  return {
    columnsA,
    columnsB
  };
}
