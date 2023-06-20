<template>
    <el-menu
        router
        class="lkx-menu"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu
            v-for="item in menu"
            :key="item.id"
            :index="item.frontUrl">
            <template slot="title">{{item.name}}</template>
            <el-menu-item
                v-for="child in item.children"
                :key="child.id"
                :index="child.frontUrl">{{child.name}}</el-menu-item>
        </el-submenu>
<!--        <el-submenu index="ums">
            <template slot="title">系统管理</template>
            <el-menu-item index="/user">用户管理</el-menu-item>
            <el-menu-item index="/role">角色管理</el-menu-item>
            <el-menu-item index="/resource">资源管理</el-menu-item>
        </el-submenu>
        <el-submenu index="pms">
            <template slot="title">商品管理</template>
            <el-menu-item index="/brand">品牌管理</el-menu-item>
            <el-menu-item index="/category">分类管理</el-menu-item>
            <el-menu-item index="/product">SPU管理</el-menu-item>
        </el-submenu>-->
    </el-menu>
</template>

<script>
export default {
    name: "lkxmenu",
    computed: {
        menu() {
            return this.$store.getters.GET_MENU
        }
    }
}
</script>

<style scoped lang="less">
    .lkx-menu {
        height: 100%;
        .el-submenu {
            overflow: hidden;
        }
    }
</style>