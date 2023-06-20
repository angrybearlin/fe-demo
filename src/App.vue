<template>
    <div id="app" v-loading.fullscreen.lock="loading>0">
        <router-view/>
    </div>
</template>

<script>
import store from '@/store/index'
export default {
    name: 'app',
    computed: {
        loading() {
            return store.getters.GET_LOADING
        }
    }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
html {
    min-width: 1000px;
}
#app {
    font-family: '微软雅黑';
    font-size: 16px;
    color: #2c3e50;
}
</style>
