<template>
    <div class="lkxlogin">
        <section class="login-content" :style="{'transform': 'rotateY(' + r + ')'}">
            <LoginForm :r.sync="r"></LoginForm>
            <FindPwd :r.sync="r"></FindPwd>
        </section>
    </div>
</template>

<script>
import LoginForm from './loginform'
import FindPwd from './findpwd'
export default {
    name: "LoginIndex",
    components: {
        LoginForm,
        FindPwd
    },
    data () {
        return {
            r: '0deg'
        }
    }
}
</script>

<style scoped lang="less">
.lkxlogin {
    height: 100vh;
    background-color: #545c64;
    color: #ffffff;
    display: flex;
    perspective: 1000px;
    .login-content {
        width: 600px;
        height: 400px;
        background: #545c64;
        box-shadow: 0px 0px 10px #0475df;
        margin: auto;
        transform-style: preserve-3d;
        border-radius: 20px;
        position: relative;
        transition: 1s;
        /deep/ .login-item {
            margin-top: 20px;
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
        }
        /deep/ h2 {
            text-align: center;
            font-size: 2rem;
            letter-spacing: 1.2rem;
        }
        /deep/ .el-form {
            margin-top: 50px;
            padding: 0 40px;
            .el-input__inner {
                color: #4b4b4b;
                background-color: #ffffff;
            }
        }
    }
}
</style>