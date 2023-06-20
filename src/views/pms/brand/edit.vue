<template>
    <el-form ref="lkxform" :model="lkxform" label-width="100px" :rules="rules">
        <el-form-item label="品牌名称" prop="name">
            <el-input maxlength="20" v-model="lkxform.name" placeholder="输入品牌名称"></el-input>
        </el-form-item>
        <el-form-item label="首字母" prop="firstLetter">
            <el-input maxlength="1" v-model="lkxform.firstLetter" placeholder="输入首字母"></el-input>
        </el-form-item>
        <el-form-item label="品牌说明" prop="description">
            <el-input v-model="lkxform.description" placeholder="输入品牌说明"></el-input>
        </el-form-item>
        <el-form-item label="品牌logo" prop="file">
            <div class="lkx-img-upload">
                <el-upload action="#" list-type="picture-card"
                           :auto-upload="false" :limit="1" :on-change="changeImg"
                            :on-remove="removeImg">
                    <i class="el-icon-picture"></i>
                </el-upload>
            </div>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" plain size="small" @click="save">保存</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import url from './api'
export default {
    name: "BrandEditor",
    props: ['id'],
    created() {
        if(this.id) {
            this.getById()
        }
    },
    data() {
        const check = (rule, value, callback) => {
            this.$get(url.check, {field: rule.field, value: value}, response => {
                if (response) {
                    callback()
                } else {
                    callback(new Error())
                }
            }, false)
        }
        return  {
            fileList: {},
            lkxform: {
                name: '',
                firstLetter: '',
                description: '',
                file: null
            },
            rules: {
                name: [
                    {required: true, message: '请输入品牌名称', trigger: 'blur'},
                    {validator: check, message: '该品牌名称已被使用', trigger: 'blur'}
                ],
                firstLetter: [
                    {required: true, message: '请输入首字母', trigger: 'blur'},
                ],
                description: [
                    {required: true, message: '请输入品牌说明', trigger: 'blur'},
                ],
                file: [
                    {required: this.id === null, message: '请上传品牌logo', trigger: 'blur'}
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
                this.fileList.push({
                    name: response.logo,
                    url: this.imgpath(response.icon)
                })
            })
        },
        save() {
            this.$post(this.id ? url.update : url.add, this.lkxform, content => {
                this.$emit('update:show', false)
                this.$emit('getTableData')
            }, this.$refs.lkxform)
        },
        changeImg (file) {
            this.lkxform.file = file.raw
        },
        removeImg () {
            this.lkxform.file = null
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