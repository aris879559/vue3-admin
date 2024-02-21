<template>
<div class="tags">
  <el-tag 
  :key="tag.name"
  v-for="(tag,index) in tags"
  :closable="tag.name !== 'home'"
  :disable-transitions="false"
  :effect="$route.name === tag.name ? 'dark' : 'plain'"
  @click="changeMenu(tag)"
  @close="handleClose(tag,index)"
  >
    {{ tag.label }}
  </el-tag>
</div> 
</template>
<script>
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    // console.log(store)
    const tags = store.state.tabsList;
    const changeMenu = (item) => {
      router.push({ name: item.name });
    };
    const handleClose = (tag, index) => {
      let length = tags.length - 1;
      // 处理vuex中的tabslist
      store.commit('closeTab', tag);
      // 如果删除的标签不是当前页面标签，则不处理
      if ( tag.name !== route.name ) {
        return;
      }
      // 如果删除的标签是当前页面，则跳转上一个路由标签
      if (index === length) {
        // 当前是最右侧标签时，点击删除当前标签，则跳转到左侧的标签路由
        router.push({
          name: tags[index - 1].name,
        });
      } else {
        // 处理点击删除中间标签时候，有右边标签跳转右边标签
        router.push({
          name: tags[index].name,
        })
      }
    };
    return {
      tags,
      changeMenu,
      handleClose,
    };
  },
};
</script>
<style lang="less" scoped>
.tags {
  padding: 6px;
  width: 100%;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>