import { defineStore } from "pinia";

interface userInfo {
  [key: string]: any;
  id: number;
  name: string;
}

const getUserInfo = () => {
  return new Promise<userInfo>((resolve, reject) => {
    setTimeout(() => {
      const data = {
        id: 6,
        name: "cz6",
      };
      resolve(data);
    }, 2000);
  });
};

export const authStore = defineStore("auth", {
  state: () => ({ name: "", id: 0 }),
  getters: {
    newName(state) {
      return `${state.name}--newName--`;
    },
  },
  actions: {
    getUserInfo() {
      return new Promise<userInfo>(async (resolve, reject) => {
        const data = await getUserInfo();
        const { name, id } = data;
        this.$patch({ name, id });
        resolve(data);
      });
    },
  },
});
