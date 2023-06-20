<template>
    <div class="login-item" style="transform: translateZ(1px);">
        <h2>系统登录</h2>
        <el-form :model="lkxform" :rules="rules" label-width="0px">
            <el-form-item prop="username">
                <el-input v-model="lkxform.username" placeholder="请输入用户名/手机号/邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="lkxform.password" placeholder="请输入登录密码" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-button style="width: 100%;" type="primary" @click="login()">登录</el-button>
            </el-form-item>
            <el-form-item>
                <el-button style="float: right; color: #ffffff;" type="text" @click="findpwd()">找回密码</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "LoginForm",
    data() {
        return {
            lkxform: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    {required: true, message: '请输入用户名/手机号/邮箱', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '请输入登录密码', trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        findpwd () {
            this.$emit('update:r', '180deg')
        },
        login() {
            this.$post('/login', this.lkxform, response => {
                this.$cookie.set('token', response.token, {expires: 7})
                this.$store.commit('SET_MENU', response.menu)
                this.$store.commit('SET_USERID', response.userId)
                this.$router.push('/index')
            }, this.$refs.lkxform)
        }
    }
}
</script>

<style scoped>

</style>