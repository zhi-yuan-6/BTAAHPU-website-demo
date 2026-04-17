<template>
  <section class="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-brand-primary/30 text-brand-cyan text-sm font-medium mb-8 animate-float">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan"></span>
        </span>
        AHPU 区块链技术协会招新进行中
      </div>
      
      <h1 class="text-5xl md:text-7xl font-bold tracking-tight mb-6">
        合作  交流  创新<br>
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-accent to-brand-cyan" v-if="association">
          {{ association.motto }}
        </span>
        <span v-else class="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-accent to-brand-cyan">
          共建区块链和谐社区
        </span>
      </h1>
      
      <p class="mt-4 max-w-2xl mx-auto text-xl text-gray-400 mb-10" v-if="association">
        {{ association.description }}
      </p>
      <p v-else class="mt-4 max-w-2xl mx-auto text-xl text-gray-400 mb-10">
        来自安徽工程大学，我们致力于打造开放、共享、创新的技术交流平台，探索 Web3 的无限边界。
      </p>
      
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <a href="#" class="px-8 py-4 rounded-full bg-gradient-to-r from-brand-primary to-brand-accent text-white font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-brand-primary/40" @click.prevent="$router.push('/join')">
          加入社区 <i class="fa-solid fa-arrow-right ml-2"></i>
        </a>
        <a href="#" class="px-8 py-4 rounded-full glass text-white font-medium text-lg hover:bg-white/10 transition-colors" @click.prevent="$router.push('/about')">
          了解更多
        </a>
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