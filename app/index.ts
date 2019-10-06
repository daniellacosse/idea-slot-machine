import Main from "./pages/Main.vue";
import Vue from "vue";
import consola from "consola";

consola.info("Idea Slot Machine 🎰 by D@nielLaCos.se");

new Vue({
  render: h => h(Main)
}).$mount("main");
