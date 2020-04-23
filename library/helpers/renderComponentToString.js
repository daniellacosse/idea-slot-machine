import Vue from "vue";
import { createRenderer } from "vue-server-renderer";

/**
 * create an html string from a Vue Component for testing purposes
 *
 * @export
 * @param {VueComponent} VueComponent the vue component we wish to render
 * @returns {Promise<string>} the rendered component string
 */
export default async function renderComponentToString(VueComponent, props = {}) {
  const renderer = createRenderer();

  const ComponentWithProps = Vue.extend(VueComponent);
  const vm = new ComponentWithProps(props).$mount();

  return renderer.renderToString(vm);
}
