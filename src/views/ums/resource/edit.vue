<template>
    <el-form ref="lkxform" :model="lkxform" label-width="100px" :rules="rules">
        <el-form-item label="资源名称" prop="name">
            <el-input maxlength="10" v-model="lkxform.name" placeholder="输入资源名称"></el-input>
        </el-form-item>
        <el-form-item label="类别" prop="type">
            <el-radio-group v-model="lkxform.type">
                <el-radio :label="1">目录</el-radio>
                <el-radio :label="0">按钮</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item
            label="前端地址"
            prop="frontUrl"
            :rules="[
                    {required: lkxform.type === 1, message: '请输入前端地址', trigger: 'blur'}
            ]">
            <el-input v-model="lkxform.frontUrl" placeholder="输入前端地址"></el-input>
        </el-form-item>
        <el-form-item
            label="后端地址"
            prop="backUrl"
            :rules="[
                    {required: lkxform.type === 0, message: '请输入后端地址', trigger: 'blur'}
            ]"
        >
            <el-input v-model="lkxform.backUrl" placeholder="输入后端地址"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" plain size="small" @click="save">保存</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import url from './api'
export default {
    name: "ResourceEditor",
    props: ['id', 'parentId', 'level'],
    created() {
        if(this.id) {
            this.getById()
        } else {
            this.lkxform.parentId = this.parentId
            this.lkxform.level = this.level
        }
    },
    data() {
        const check = (rule, value, callback) => {
            this.$get(url.check, {value: value, id: this.id}, response => {
                if (response) {
                    callback()
                } else {
                    callback(new Error())
                }
            }, false)
        }
        return  {
            lkxform: {
                name: '',
                type: null,
                level: 1,
                parentId: null,
                frontUrl: null,
                backUrl: null
            },
            rules: {
                name: [
                    {required: true, message: '请输入资源名称', trigger: 'blur'},
                    {validator: check, message: '该资源名称已经存在', trigger: 'blur'}
                ],
                type: [
                    {required: true, message: '请选择资源类别', trigger: 'blur'}
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
.lkx-img-upload {
    width: 148px;
    height: 148px;
    overflow: hidden;
}
</style>