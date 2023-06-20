<template>
    <div>
        <el-transfer
            :data="users"
            v-model="lkxform.values"
            :titles="titles"
            :props="props"
            ></el-transfer>
        <el-button style="margin-top: 10px" type="primary" size="small" @click="save()">保存</el-button>
    </div>
</template>

<script>
export default {
    name: "RoleUser",
    created() {
        this.lkxform.roleId = this.$route.query.roleId
        this.getData()
    },
    data() {
        return {
            titles: ['未关联', '已关联'],
            users: [],
            lkxform: {
                roleId: null,
                values: []
            },
            props: {
                key: "id",
                label: "name"
            }
        }
    },
    methods: {
        getData() {
            this.$get('/umsRoleUser/init', {roleId: this.lkxform.roleId}, response => {
                this.users = response.users
                this.lkxform.values = response.values
            })
        },
        save() {
            this.$post('/umsRoleUser/save', this.lkxform, response => {
                this.$router.push('/role')
            })
        }
    }
}
</script>

<style scoped>

</style>