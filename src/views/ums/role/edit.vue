<template>
    <el-form ref="lkxform" :model="lkxform" label-width="100px" :rules="rules">
        <el-form-item label="角色名称" prop="name">
            <el-input maxlength="10" v-model="lkxform.name" placeholder="输入角色名称"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" plain size="small" @click="save">保存</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import url from './api'
export default {
    name: "RoleEditor",
    props: ['id'],
    created() {
        if(this.id) {
            this.getById()
        }
    },
    data() {
        const check = (rule, value, callback) => {
            this.$get(url.check, {field: rule.field, value: value, id: this.id}, response => {
                if (response) {
                    callback()
                } else {
                    callback(new Error())
                }
            }, false)
        }
        return  {
            lkxform: {
                name: ''
            },
            rules: {
                name: [
                    {required: true, message: '请输入角色名称', trigger: 'blur'},
                    {validator: check, message: '该角色名称已被使用', trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        getById() {
            this.$get(url.getById, {id: this.id}, response => {
                for (const key in this.lkxform) {
                    if(Object.prototype.hasOwnProperty.call(response, key)) {
                        this.lkxform[key] = response[key]
                    }
                }
                this.lkxform.id = this.id
            })
        },
        save() {
            this.$post(this.id ? url.update : url.add, this.lkxform, content => {
                this.$emit('update:show', false)
                this.$emit('getTableData')
            }, this.$refs.lkxform)
        }
    }
}
</script>

<style scoped lang="less">
</style>