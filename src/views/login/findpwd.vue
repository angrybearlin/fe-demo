<template>
    <div class="login-item" style="transform: rotateY(180deg) translateZ(1px);">
        <h2>找回密码</h2>
        <el-form :model="lkxform" :rules="rules" label-width="0px">
            <el-form-item prop="username">
                <el-input v-model="lkxform.username" placeholder="请输入用户名/手机号/邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input style="width: 248px; margin-right: 10px;" v-model="lkxform.code" placeholder="请输入验证码"></el-input>
                <el-button type="primary">发送验证码</el-button>
            </el-form-item>
            <el-form-item>
                <el-button style="width: 100%;" type="primary">找回</el-button>
            </el-form-item>
            <el-form-item>
                <el-button style="float: right; color: #ffffff" type="text" @click="backlogin()">回到登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "FindPwd",
    data() {
        return {
            lkxform: {
                username: '',
                code: ''
            },
            rules: {
                username: [
                    {required: true, message: '请输入用户名/手机号/邮箱', trigger: 'blur'}
                ],
                code: [
                    {required: true, message: '请输入验证码', trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        backlogin() {
            this.$emit('update:r', '0deg')
        }
    }
}
</script>

<style scoped>

</style>