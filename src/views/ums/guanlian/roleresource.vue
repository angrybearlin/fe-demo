<template>
    <div>
        <el-tree
            ref="lkxtree"
            :data="resources"
            :props="props"
            node-key="id"
            default-expand-all
            show-checkbox
            :default-checked-keys="checks"></el-tree>
        <el-button style="margin-top: 10px;" size="small" type="primary" @click="save()">保存</el-button>
    </div>
</template>

<script>
export default {
    name: "RoleResource",
    created() {
        this.lkxform.roleId = this.$route.query.roleId
        this.getData()
    },
    data() {
        return {
            checks: [

            ],
            lkxform: {
                roleId: null,
                menus: [],
                btns: []
            },
            resources: [],
            props: {
                label: "name"
            }
        }
    },
    methods: {
        getData() {
            this.$get("/umsRoleResource/init", {roleId: this.lkxform.roleId}, response => {
                this.resources = response.resource
                this.checks = response.checks
            })
        },
        save() {
            const result = this.$refs.lkxtree.getCheckedNodes(false, true)
            const menus = []
            const btns = []
            for (const i in result) {
                if (result[i].type === 1) {
                    menus.push(result[i].id)
                } else {
                    btns.push(result[i].id)
                }
            }
            this.lkxform.menus = menus
            this.lkxform.btns = btns
            this.$post('/umsRoleResource/save', this.lkxform, response => {
                this.$router.push('/role')
            })
        }
    }
}
</script>

<style scoped>

</style>