<template>
  <el-container>

    <el-header>
      <div>
        <span>AppDeployer Dashboard</span>
      </div>
    </el-header>

    <el-container>
      <el-aside width="200px">
        <el-menu
        background-color="#333744"
        text-color="#fff"
        active-text-color="#409eff"
        unique-opened
        router
        :defaultActive = "activePath">
          <el-menu-item :index="item.path" v-for="item in menuList" :key="item.id"
            @click="saveNavState(item.path)">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{item.name}}</span>
              </template>
            </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main>
        <router-view></router-view>
      </el-main>

    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menuList: [
        { id: 1, path: '/home/kube', name: 'kube' },
        { id: 2, path: '/home/vm', name: 'vm' }
      ],
      activePath: ''
    }
  },
  created() {
  },
  mounted() {
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
    }
  }
}
</script>

<style lang="less" scoped>
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
  img {
    width: 50px;
    height: 50px;
  }
}
.el-aside{
  background-color: #333744;
  .el-menu {
    border-right: none;//去菜单边框竖条
  }
}
.el-main{
  background-color: #eaedf1;
}
.el-container{
  height: 100%;
}
</style>
