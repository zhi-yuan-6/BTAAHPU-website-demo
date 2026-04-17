<template>
  <section class="min-h-screen py-24 bg-black/20 flex items-center">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div class="text-center mb-16 reveal">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">竞赛信息</h2>
        <p class="text-gray-400 max-w-2xl mx-auto">了解区块链相关的重要竞赛，展示协会成员的获奖情况。</p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <div v-for="competition in competitions" :key="competition.id" class="glass rounded-2xl overflow-hidden hover:-translate-y-2 transition-transform duration-300 reveal group">
          <div class="h-44 bg-gradient-to-br from-brand-primary/30 via-brand-accent/20 to-brand-cyan/25 relative overflow-hidden">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.45),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(34,211,238,0.35),transparent_50%)]"></div>
            <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-15"></div>

            <div class="absolute top-4 left-4 right-4 flex items-center justify-between gap-3">
              <div class="flex items-center gap-2 min-w-0">
                <span :class="getLevelClass(competition.level)" class="text-xs px-2 py-1 rounded-md font-bold whitespace-nowrap">
                  {{ getLevelText(competition.level) }}
                </span>
                <span v-if="competition.type" class="text-xs text-gray-200/80 truncate">
                  {{ competition.type }}
                </span>
              </div>
              <span :class="getStatusClass(competition.status)" class="text-xs px-2 py-1 rounded-md font-semibold whitespace-nowrap">
                {{ getStatusText(competition.status) }}
              </span>
            </div>

            <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 text-sm">
              <div class="flex items-center gap-2 text-gray-200/90 min-w-0">
                <i class="fa-regular fa-calendar"></i>
                <span class="truncate">{{ formatRange(competition.start_time, competition.end_time) }}</span>
              </div>
              <div v-if="competition.prize_pool" class="flex items-center gap-2 text-gray-200/90 whitespace-nowrap">
                <i class="fa-solid fa-coins"></i>
                <span>{{ competition.prize_pool }}</span>
              </div>
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold mb-2 group-hover:text-brand-cyan transition-colors">
              {{ competition.name }}
            </h3>
            <p class="text-gray-400 text-sm mb-4">{{ competition.description }}</p>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-500">
                <span v-if="competition.website">官网</span>
                <span v-else>更多信息</span>
              </span>
              <a :href="competition.website" target="_blank" class="text-brand-primary text-sm font-medium hover:underline">
                了解详情
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- 获奖情况 -->
      <div class="mt-24 reveal">
        <h3 class="text-2xl font-bold mb-8 text-center">协会获奖情况</h3>
        <div class="grid md:grid-cols-2 gap-8">
          <div v-for="award in awards" :key="award.id" class="glass rounded-2xl p-6 border border-white/5">
            <div class="flex items-center gap-4 mb-4">
              <div class="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500">
                <i class="fa-solid fa-trophy text-xl"></i>
              </div>
              <div>
                <h4 class="text-lg font-bold">{{ award.competition_name }}</h4>
                <p class="text-gray-400 text-sm">{{ award.year }}年</p>
              </div>
            </div>
            <p class="text-gray-300 mb-4">{{ award.description }}</p>
            <div class="flex items-center gap-2 text-sm text-yellow-500">
              <i class="fa-solid fa-user"></i>
              <span>{{ award.team_members }}</span>
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

// 获取竞赛列表
const competitions = computed(() => apiStore.competitions)

// 获取获奖情况
const awards = computed(() => apiStore.awards)

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long'
  })
}

const formatRange = (start, end) => {
  if (!start && !end) return ''
  if (start && !end) return `${formatDate(start)} 开始`
  if (!start && end) return `截止 ${formatDate(end)}`
  return `${formatDate(start)} - ${formatDate(end)}`
}

// 获取竞赛级别文本
const getLevelText = (level) => {
  const levelMap = {
    'national': '国家级',
    'provincial': '省级',
    'international': '国际',
    'industry': '行业'
  }
  return levelMap[level] || level
}

// 获取竞赛级别样式
const getLevelClass = (level) => {
  const classMap = {
    'national': 'bg-brand-primary/20 text-brand-primary border border-brand-primary/30',
    'provincial': 'bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30',
    'international': 'bg-emerald-500/15 text-emerald-300 border border-emerald-400/30',
    'industry': 'bg-purple-500/15 text-purple-300 border border-purple-400/30'
  }
  return classMap[level] || 'bg-gray-500/15 text-gray-300 border border-white/10'
}

const getStatusText = (status) => {
  const map = {
    upcoming: '即将开始',
    ongoing: '进行中',
    completed: '已结束'
  }
  return map[status] || '未知状态'
}

const getStatusClass = (status) => {
  const map = {
    upcoming: 'bg-white/10 text-gray-100 border border-white/15',
    ongoing: 'bg-emerald-500/15 text-emerald-200 border border-emerald-400/30',
    completed: 'bg-white/5 text-gray-300 border border-white/10'
  }
  return map[status] || 'bg-white/5 text-gray-300 border border-white/10'
}

// 初始化数据
onMounted(async () => {
  if (apiStore.competitions.length === 0) {
    await apiStore.fetchCompetitions()
  }
  if (apiStore.awards.length === 0) {
    await apiStore.fetchAwards()
  }
})
</script>