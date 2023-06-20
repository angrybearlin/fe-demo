<template>
    <div>
        <div class="lkx-filter">
            <el-input v-model="searchVal" placeholder="输入品牌名称搜索"></el-input>
            <el-button type="primary" plain icon="el-icon-search" @click="search">搜索</el-button>
        </div>
        <el-table :data="tableData.records">
            <el-table-column label="品牌名称">
                <template slot-scope="scope">
                    <el-popover
                        trigger="hover"
                        placement="top">
                        <el-avatar
                            shape="square"
                            :size="150"
                            :src="imgpath(scope.row.logo)"></el-avatar>
                        <span slot="reference">{{scope.row.name}}</span>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip label="首字母" prop="firstLetter"></el-table-column>
            <el-table-column show-overflow-tooltip label="品牌描述" prop="description"></el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.active">启用</span>
                    <span v-else>禁用</span>
                </template>
            </el-table-column>
            <el-table-column width="150px">
                <template slot="header">
                    <el-button type="primary" plain size="small" @click="add()">添加品牌</el-button>
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
        <el-pagination
            style="margin-top: 10px"
            background
            :page-count="tableData.pages"
            :current-page.sync="query.pageNo"
            @current-change="getTableData()"></el-pagination>
        <el-dialog
            :title="editDialog.title"
            :visible.sync="editDialog.show"
            :close-on-click-modal="false"
            :id="editDialog.id"
            width="400px">
            <component v-if="editDialog.show" :is="editDialog.component" :show.sync="editDialog.show" @getTableData="getTableData"></component>
        </el-dialog>
    </div>
</template>

<script>
import url from './api'
export default {
    name: "BrandIndex",
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
                pageNo: 1,
                pageSize: 8,
                value: ''
            },
            tableData: {}
        }
    },
    methods: {
        getTableData () {
            this.$get(url.list, this.query, content => {
                this.tableData = content
            })
        },
        search() {
            this.query.pageNo = 1
            this.query.value = this.searchVal
            this.getTableData()
        },
        add() {
            this.editDialog.title = '添加品牌'
            this.editDialog.show = true
            this.editDialog.id = null
        },
        update(id) {
            this.editDialog.title = '修改品牌'
            this.editDialog.show = true
            this.editDialog.id = id
        },
        del(id, active) {
            const txt = active ? '确定要将该数据启用吗？' : '确定要将该数据删除吗？'
            this.$confirm(txt, '提示', {
                type: 'warning'
            }).then(() => {
                this.$post(url.del, {id: id, active: active}, response => {
                    this.getTableData()
                })
            }).catch(() => {})
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