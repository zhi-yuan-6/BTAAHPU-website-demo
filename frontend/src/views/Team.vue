<template>
  <section class="min-h-screen py-24 bg-black/20 flex flex-col justify-center">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div class="mb-12 reveal">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">核心团队</h2>
        <p class="text-gray-400">左右滑动查看指导老师与协会骨干</p>
      </div>

      <!-- 指导老师 & 核心管理层 -->
      <div class="mb-12">
        <h3 class="text-xl font-bold text-brand-primary mb-4 ml-2">指导老师 & 核心管理层</h3>
        <div class="team-scroll-container">
          <div v-for="member in leaders" :key="member.id" class="flex-shrink-0 w-72 glass rounded-2xl p-6 text-center group hover:-translate-y-2 transition-transform duration-300 border border-white/5">
            <div class="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 p-1">
              <div class="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                <img v-if="member.avatar" :src="member.avatar" :alt="member.name" class="w-full h-full object-cover">
                <i v-else-if="member.role === 'teacher'" class="fa-solid fa-chalkboard-user text-3xl text-gray-400"></i>
                <i v-else-if="member.role === 'leader'" class="fa-solid fa-user-astronaut text-3xl text-brand-primary"></i>
                <i v-else class="fa-solid fa-user text-3xl text-gray-400"></i>
              </div>
            </div>
            <h3 class="text-xl font-bold text-white">{{ member.name }}</h3>
            <p class="text-brand-primary text-sm font-medium mb-3">{{ member.position }}</p>
            <p class="text-gray-400 text-xs">{{ member.description }}</p>
          </div>
        </div>
      </div>

      <!-- 优秀成员 -->
      <div>
        <h3 class="text-xl font-bold text-brand-cyan mb-4 ml-2">优秀成员</h3>
        <div class="team-scroll-container">
          <div v-for="member in normalMembers" :key="member.id" class="flex-shrink-0 w-64 glass rounded-xl p-5 text-center group hover:bg-white/5 transition-colors">
            <div class="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-800 flex items-center justify-center">
              <img v-if="member.avatar" :src="member.avatar" :alt="member.name" class="w-full h-full object-cover rounded-full">
              <i v-else class="fa-solid fa-user text-gray-500"></i>
            </div>
            <h4 class="font-bold text-white">{{ member.name }}</h4>
            <p class="text-xs text-gray-500">{{ member.department }}</p>
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

// 获取成员列表
const members = computed(() => apiStore.members)

// 过滤指导老师和核心管理层
const leaders = computed(() => {
  return members.value.filter(member => member.role === 'teacher' || member.role === 'leader')
})

// 过滤普通成员
const normalMembers = computed(() => {
  return members.value.filter(member => member.role === 'member')
})

// 初始化数据
onMounted(async () => {
  if (apiStore.members.length === 0) {
    await apiStore.fetchMembers()
  }
})
</script>