<template>
    <div>
        <div class="lkx-filter">
            <el-input v-model="searchVal" placeholder="输入角色名称搜索"></el-input>
            <el-button type="primary" plain icon="el-icon-search" @click="search">搜索</el-button>
        </div>
        <el-table :data="tableData">
            <el-table-column label="角色名称" prop="name"></el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.active">启用</span>
                    <span v-else>禁用</span>
                </template>
            </el-table-column>
            <el-table-column label="用户和权限" width="220px">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="guanlian(scope.row.id, '/role/user')">用户列表</el-button>
                    <el-button type="primary" size="mini" @click="guanlian(scope.row.id, '/role/resource')">权限列表</el-button>
                </template>
            </el-table-column>
            <el-table-column width="150px">
                <template slot="header">
                    <el-button type="primary" plain size="small" @click="add()">添加角色</el-button>
                </template>
                <template slot-scope="scope">
                    <template v-if="scope.row.active">
                        <el-button type="primary" size="mini" @click="update(scope.row.id)">修改</el-button>
                        <el-button type="danger" size="mini" @click="del(scope.row.id, 0)">禁用</el-button>
                    </template>
                    <el-button v-else type="success" size="mini" @click="del(scope.row.id, 1)">启用</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            :title="editDialog.title"
            :visible.sync="editDialog.show"
            :close-on-click-modal="false"
            :id="editDialog.id"
            width="400px">
            <component
                v-if="editDialog.show"
                :is="editDialog.component"
                :id="editDialog.id"
                :show.sync="editDialog.show"
                @getTableData="getTableData"></component>
        </el-dialog>
    </div>
</template>

<script>
import url from './api'
export default {
    name: "RoleIndex",
    created() {
        this.getTableData();
    },
    data() {
        return {
            searchVal: '',
            editDialog: {
                title: '',
                show: false,
                id: null,
                component: () => import('./edit')
            },
            query: {
                value: ''
            },
            tableData: []
        }
    },
    methods: {
        getTableData () {
            this.$get(url.list, this.query, content => {
                this.tableData = content
            })
        },
        search() {
            this.query.value = this.searchVal
            this.getTableData()
        },
        add() {
            this.editDialog.title = '添加角色'
            this.editDialog.show = true
            this.editDialog.id = null
        },
        update(id) {
            this.editDialog.title = '修改角色'
            this.editDialog.show = true
            this.editDialog.id = id
        },
        del(id, active) {
            const txt = active ? '确定要将该数据启用吗？' : '确定要将该数据禁用吗？'
            this.$confirm(txt, '提示', {
                type: 'warning'
            }).then(() => {
                this.$post(url.del, {id: id, active: active}, response => {
                    this.getTableData()
                })
            }).catch(() => {})
        },
        guanlian(roleId, url) {
            this.$router.push({
                path: url,
                query: {
                    roleId: roleId
                }
            })
        }
    }
}
</script>

<style scoped lang="less">
.lkx-filter {
    margin-bottom: 10px;
    .el-input {
        width: auto;
        margin-right: 10px;
    }
}
</style>