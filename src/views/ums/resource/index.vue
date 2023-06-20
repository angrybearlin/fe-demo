<template>
    <div>
        <div class="lkx-filter">
            <el-input v-model="searchVal" placeholder="输入资源名称搜索"></el-input>
            <el-button type="primary" plain icon="el-icon-search" @click="search">搜索</el-button>
        </div>
        <el-table :data="tableData" row-key="id">
            <el-table-column width="150px" label="资源名称" prop="name"></el-table-column>
            <el-table-column label="资源类别">
                <template slot-scope="scope">
                    <span v-if="scope.row.type === 1">目录</span>
                    <span v-else>按钮</span>
                </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip label="前端地址" prop="frontUrl"></el-table-column>
            <el-table-column show-overflow-tooltip label="后端地址" prop="backUrl"></el-table-column>
            <el-table-column width="220px">
                <template slot="header">
                    <el-button type="primary" plain size="small" @click="add('', 1)">添加资源</el-button>
                </template>
                <template slot-scope="scope">
                    <el-button v-if="scope.row.type === 1" type="primary" size="mini" @click="add(scope.row.id, scope.row.level + 1)">追加</el-button>
                    <el-button type="primary" size="mini" @click="update(scope.row.id)">修改</el-button>
                    <el-button type="danger" size="mini" @click="del(scope.row.id)">删除</el-button>
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
                :parentId="editDialog.parentId"
                :level="editDialog.level"
                :show.sync="editDialog.show"
                @getTableData="getTableData"></component>
        </el-dialog>
    </div>
</template>

<script>
import url from './api'
import { copy } from 'copy-anything'
export default {
    name: "ResourceIndex",
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
                parentId: null,
                level: null,
                component: () => import('./edit')
            },
            tableData: []
        }
    },
    methods: {
        getTableData () {
            this.$get(url.list,{}, content => {
                this.tableData = copy(content)
                this.allData = copy(content)
            })
        },
        search() {
            this.tableData = copy(this.allData)
            if (this.searchVal.trim() !== '') {
                this.findItem(this.searchVal, this.tableData)
            }
        },
        findItem(value, list) {
            for (let i=0; i< list.length; i++) {
                if (list[i].children.length > 0) {
                    this.findItem(value, list[i].children)
                }
                if (list[i].name.indexOf(value) === -1 && list[i].children.length === 0) {
                    list.splice(i, 1);
                    i--;
                }
            }
        },
        add(parentId, level) {
            this.editDialog.title = '添加资源'
            this.editDialog.show = true
            this.editDialog.id = null
            this.editDialog.parentId = parentId
            this.editDialog.level = level
        },
        update(id) {
            this.editDialog.title = '修改资源'
            this.editDialog.show = true
            this.editDialog.id = id
        },
        del(id) {
            this.$confirm('确定要将该数据删除吗？', '提示', {
                type: 'warning'
            }).then(() => {
                this.$post(url.del, {id: id}, response => {
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