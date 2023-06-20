<template>
    <el-form
        ref="lkxform"
        :model="lkxform"
        label-width="100px"
        :rules="rules">
        <el-form-item label="用户姓名" prop="name">
            <el-input maxlength="20" v-model="lkxform.name" placeholder="输入用户姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
            <el-input maxlength="11" v-model="lkxform.phone" placeholder="输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="电子信箱" prop="email">
            <el-input maxlength="64" v-model="lkxform.email" placeholder="输入电子信箱"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="lkxform.gender">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="0">女</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="用户头像" prop="file">
            <div class="lkx-img-upload">
                <el-upload action="#"
                           list-type="picture-card"
                           :auto-upload="false"
                           :limit="1"
                           :file-list="fileList"
                           :on-change="changeImg"
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
    name: "usereditor",
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
            fileList: [],
            lkxform: {
                name: '',
                phone: '',
                email: '',
                gender: null,
                file: null
            },
            rules: {
                name: [
                    {required: true, message: '请输入用户姓名', trigger: 'blur'}
                ],
                phone: [
                    {required: true, message: '请输入手机号', trigger: 'blur'},
                    {pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, message: '请输入正确的手机号', trigger: 'blur'},
                    {validator: check, message: '该手机号已被使用', trigger: 'blur'}
                ],
                email: [
                    {required: true, message: '请输入电子邮箱', trigger: 'blur'},
                    {type: 'email', message: '请输入正确的电子邮箱', trigger: 'blur'},
                    {validator: check, message: '该电子邮箱已被使用', trigger: 'blur'}
                ],
                gender: [
                    {required: true, message: '请输入用户性别', trigger: 'blur'}
                ],
                file: [
                    {required: this.id === null, message: '请上传用户头像', trigger: 'blur'}
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
                    name: response.icon,
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