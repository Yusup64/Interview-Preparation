<template>
  <div class="box">
    <HelloWorld />
    <p>{{ userInfo.login }}</p>
    <img :src="userInfo.avatar_url" alt="" style="border-radius: 50%" /><br />
    <button @click="btnClick">BUTTON</button>
    <button @click="testRequest">REQUEST</button>
    {{ message }}
    {{ $mpx }}
    <ul @click="handleClick">
      <li v-for="(item, index) in list" :data-index="index">{{ item }}</li>
    </ul>
  </div>
</template>
<script>
import HelloWorld from "./components/HelloWorld.vue";
function debounce(wait, callback) {
  return function (target, name, descriptor) {
    // console.warn("debounce:-----", target, name, descriptor);
    let oldFn = descriptor.value;
    let timer = null;
    descriptor.value = function (e) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        oldFn.call(this, e);
        callback && callback.call(this, e);
      }, wait);
    };
    return descriptor;
  };
}
function Request(path, params) {
  //   console.log(params.params.c);
  return function (target, name, descriptor) {
    // console.warn("Request:-----", target, name, descriptor);
    let oldFn = descriptor.value;
    descriptor.value = function (e) {
      for (let prop in params) {
        params[prop] = this[prop];
        console.log(params);
      }
      fetch("https://api.github.com/users/Yusup64")
        .then((res) => res.json())
        .then((res) => {
          oldFn.call(this, res);
          //   console.log("Request:-----", path, params);
        });
    };
    return descriptor;
  };
}
function Inject() {
  return function (target, name, descriptor) {
    descriptor.value = function () {
      this.sayHi = function () {
        console.log("Inject:-----", "Hi");
      };
    };
    return descriptor;
  };
}
export default {
  name: "App",
  components: {
    HelloWorld,
  },
  data() {
    return {
      message: "Hello Vue!",
      list: Array.from({ length: 25 }).map((item, index) => index + 1),
      userInfo: {},
    };
  },
  methods: {
    @debounce(1000)
    handleClick(event) {
      if (event.target.tagName === "LI") {
        let index = event.target.getAttribute("data-index");
        console.log(this.list[index]);
      }
    },
    @debounce(500, function (e) {
      console.log("debounce:", this, e);
    })
    btnClick() {
      this.sayHi();
      this.list[0] = 1231;
      //   this.$forceUpdate();
      this._watcher.update();
      //   errorFn();
    },
    @Request("/api/test", {
      a: 1,
      b: 2,
      message: "",
    })
    testRequest(result) {
      console.log("result------", result);
      this.userInfo = result;
    },
  },
  @Inject()
  mounted() {},
};
</script>

<style></style>
