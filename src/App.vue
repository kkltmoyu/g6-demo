<template>
    <div id="app">
        <i class="iconfont iconicon_docker-image"></i>
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">自定义布局demo</router-link>
        </div>
        <router-view />
    </div>
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}

i{
  font-size:36px !important;
} 
</style>

