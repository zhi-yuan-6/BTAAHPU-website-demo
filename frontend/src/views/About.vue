<template>
  <section class="min-h-screen py-24 relative flex items-center">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div class="grid md:grid-cols-2 gap-16 items-center">
        <div class="reveal">
          <h2 class="text-brand-primary font-bold tracking-wide uppercase text-sm mb-2">关于我们</h2>
          <h3 class="text-3xl md:text-4xl font-bold mb-6">安工程学子<br>探索 Web3 的大本营</h3>
          <p class="text-gray-400 text-lg mb-6 leading-relaxed" v-if="association">
            {{ association.description }}
          </p>
          <p v-else class="text-gray-400 text-lg mb-6 leading-relaxed">
            AHPU.DAO
            成立于安徽工程大学，我们致力于打破区块链技术的学习壁垒。无论你是数理学院的建模达人、还是计信学院的代码大神，亦或是智能院的算法精英，还有来自其他学院对数字经济感兴趣的同学，这里都是你接触前沿科技的起点。
          </p>
          <ul class="space-y-4 mb-8">
            <li class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary">
                <i class="fa-solid fa-check"></i>
              </div>
              <span class="text-gray-300">每月线下技术沙龙</span>
            </li>
            <li class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary">
                <i class="fa-solid fa-check"></i>
              </div>
              <span class="text-gray-300">名企实习与内推机会</span>
            </li>
            <li class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary">
                <i class="fa-solid fa-check"></i>
              </div>
              <span class="text-gray-300">跨学科项目组队实战</span>
            </li>
          </ul>
        </div>

        <div class="relative reveal delay-200">
          <div
            class="absolute -inset-4 bg-gradient-to-r from-brand-primary to-brand-cyan rounded-2xl opacity-20 blur-lg">
          </div>
          <div class="relative glass rounded-2xl p-8 border border-white/10">
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors group">
                <i
                  class="fa-solid fa-book-open text-3xl text-brand-cyan mb-4 group-hover:scale-110 transition-transform"></i>
                <h4 class="font-bold text-lg">知识库</h4>
                <p class="text-sm text-gray-400 mt-2">共享学习资源</p>
              </div>
              <div class="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors group">
                <i
                  class="fa-solid fa-laptop-code text-3xl text-brand-accent mb-4 group-hover:scale-110 transition-transform"></i>
                <h4 class="font-bold text-lg">实战营</h4>
                <p class="text-sm text-gray-400 mt-2">手把手教你开发</p>
              </div>
              <div class="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors group">
                <i
                  class="fa-solid fa-people-group text-3xl text-pink-500 mb-4 group-hover:scale-110 transition-transform"></i>
                <h4 class="font-bold text-lg">校友圈</h4>
                <p class="text-sm text-gray-400 mt-2">连接行业前辈</p>
              </div>
              <div class="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors group">
                <i
                  class="fa-solid fa-trophy text-3xl text-yellow-500 mb-4 group-hover:scale-110 transition-transform"></i>
                <h4 class="font-bold text-lg">黑客松</h4>
                <p class="text-sm text-gray-400 mt-2">赢取奖金与荣誉</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useApiStore } from '../stores/api'

const apiStore = useApiStore()

// 获取协会信息
const association = computed(() => apiStore.association)

// 初始化数据
onMounted(async () => {
  if (!apiStore.association) {
    await apiStore.fetchAssociation()
  }
})
</script>