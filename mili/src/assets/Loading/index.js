/**
 * @author CloudIris
 * 实现自定义加载实例的插件JS
 */

import Vue from 'vue'

import CustomLoading from '../../components/Loading/CustomLoading'

const LoadingConstructor = Vue.extend(CustomLoading)

const instance = new LoadingConstructor({
    el: document.createElement('div')
})

instance.show = false
const loading = {
    // 要呈现加载区域的目标元素
    show(targetParentElement) {
        instance.show = true
        // document.body.appendChild(instance.$el)
        targetParentElement.appendChild(instance.$el)
    },
    hide() {
        instance.show = false
    }
}

export default {
    install() {
        if (!Vue.$showLoading) {
            Vue.$showLoading = loading
        }
        Vue.mixin({
            created() {
                this.$showLoading = Vue.$showLoading
            }
        })
    }
}
