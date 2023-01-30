import { computed } from "vue";
import { formJsonItem } from "../utils/public";
import { normalFormDataMap, extractData } from "../utils/formFormat";
interface Options {
  rawList: formJsonItem[];
}
export default function (options: Options) {
  /**
   * @description: 处理 为 对象
   * @return {*}
   */
  const formDataMap = computed(() => {
    return normalFormDataMap(options.rawList);
  });
  /**
   * @description: 处理 为 对象
   * @return {*}
   */
  const formData = computed(() => {
    return extractData(options.rawList);
  });
  return {
    formDataMap,
    formData,
  };
}
