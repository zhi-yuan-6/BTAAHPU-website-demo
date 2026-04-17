<template>
  <section class="min-h-screen py-24 flex items-center">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div class="text-center mb-16 reveal">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">近期活动</h2>
        <p class="text-gray-400 max-w-2xl mx-auto">参与我们的线下聚会和线上研讨会，与安工程的极客们一起头脑风暴。</p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <div v-for="event in events" :key="event.id" class="glass rounded-2xl overflow-hidden hover:-translate-y-2 transition-transform duration-300 reveal group">
          <div class="h-48 bg-gradient-to-br from-indigo-900 to-purple-900 relative overflow-hidden">
            <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30"></div>
            <div class="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg text-sm border border-white/20">
              <i class="fa-regular fa-calendar mr-2"></i> {{ formatDate(event.start_time) }}
            </div>
          </div>
          <div class="p-6">
            <div class="flex items-center gap-2 mb-3">
              <span class="bg-brand-primary/20 text-brand-primary text-xs px-2 py-1 rounded font-bold">{{ event.event_type }}</span>
              <span class="text-gray-500 text-xs">{{ event.location }}</span>
            </div>
            <h3 class="text-xl font-bold mb-2 group-hover:text-brand-primary transition-colors">{{ event.title }}</h3>
            <p class="text-gray-400 text-sm mb-4">{{ event.description }}</p>
            <a :href="event.link" v-if="event.link" target="_blank" class="text-brand-cyan text-sm font-medium hover:underline">
              立即报名 <i class="fa-solid fa-arrow-right ml-1"></i>
            </a>
            <a href="#" v-else class="text-brand-cyan text-sm font-medium hover:underline">
              了解详情 <i class="fa-solid fa-arrow-right ml-1"></i>
            </a>
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

// 获取活动列表
const events = computed(() => apiStore.events)

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    month: 'long',
    day: 'numeric'
  })
}

// 初始化数据
onMounted(async () => {
  if (apiStore.events.length === 0) {
    await apiStore.fetchEvents()
  }
})
</script>