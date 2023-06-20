<template>
  <el-container class="lkx-app">
    <el-header>
        <span style="padding-right: 1200px">欢迎光临</span>
        <el-button type="text" @click="logout()">退出登录</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
          <lkxmenu></lkxmenu>
      </el-aside>
      <el-main>
          <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import lkxmenu from '@/components/menu'
import store from '@/store/index'
export default {
    name: "lkxindex",
    components: {
        lkxmenu
    },methods: {
        logout() {
            this.$get('/logout', [], response => {
                console.dir(store.getters.GET_USERID)
            })
        }
    }
}
</script>

<style scoped lang="less">
@lkx-border: 1px solid #cccccc;
.lkx-app {
    height: calc(100vh - 60px);
    h1 {
        line-height: 60px;
    }
    .el-header {
        border-bottom: @lkx-border;
    }
}
</style>