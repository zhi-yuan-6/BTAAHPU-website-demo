<template>
  <section class="min-h-screen py-16 bg-black/20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <!-- 标题区域 -->
      <div class="text-center mb-8 reveal">
        <h2 class="text-3xl md:text-4xl font-bold mb-3">学习资源</h2>
        <p class="text-gray-400 max-w-2xl mx-auto text-sm">
          精选区块链相关教程、文档、工具与社区链接
        </p>
      </div>

      <!-- 搜索框 -->
      <div class="max-w-xl mx-auto mb-6 reveal">
        <div class="relative">
          <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm"></i>
          <input
            v-model.trim="query"
            type="search"
            placeholder="搜索标题或链接…"
            class="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary/40"
            autocomplete="off"
          />
        </div>
      </div>

      <!-- 分类标签切换 -->
      <div class="flex flex-wrap justify-center gap-2 mb-8 reveal">
        <button
          v-for="(section, index) in blockchainResourceSections"
          :key="section.section"
          @click="activeTab = index"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
            activeTab === index
              ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/30'
              : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
          ]"
        >
          {{ section.section }}
        </button>
      </div>

      <!-- 无结果提示 -->
      <div v-if="displaySubsections.length === 0" class="text-center text-gray-500 py-12 reveal">
        没有匹配的链接，请尝试其它关键词。
      </div>

      <!-- 内容区域：子分类卡片 -->
      <div v-else class="space-y-8">
        <div
          v-for="(sub, si) in displaySubsections"
          :key="si + (sub.title || 'root')"
          v-show="sub.links.length > 0"
          class="reveal"
        >
          <!-- 子分类标题 -->
          <h3 v-if="sub.title" class="text-lg font-semibold text-brand-cyan mb-4 flex items-center gap-2">
            <i class="fa-solid fa-folder-open text-sm"></i>
            {{ sub.title }}
          </h3>

          <!-- 链接网格卡片 -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <a
              v-for="(link, li) in sub.links"
              :key="li + link.url"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="group glass rounded-xl border border-white/5 p-4 hover:border-brand-primary/30 hover:bg-white/[0.06] transition-all duration-300 hover:-translate-y-1"
            >
              <div class="flex items-start gap-3">
                <span class="mt-0.5 text-brand-primary opacity-80 group-hover:opacity-100 flex-shrink-0">
                  <i class="fa-solid fa-link text-sm"></i>
                </span>
                <div class="min-w-0 flex-1">
                  <span class="font-medium text-white group-hover:text-brand-cyan transition-colors block text-sm truncate">
                    {{ link.title }}
                  </span>
                  <span class="text-xs text-gray-500 break-all line-clamp-1 mt-1">{{ formatUrl(link.url) }}</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { blockchainResourceSections } from '../data/blockchainResources.js'

const query = ref('')
const activeTab = ref(0)

const norm = (s) => (s || '').toLowerCase()

// 简化URL显示
const formatUrl = (url) => {
  try {
    const parsed = new URL(url)
    return parsed.hostname + (parsed.pathname !== '/' ? parsed.pathname.slice(0, 30) : '')
  } catch {
    return url.slice(0, 40)
  }
}

// 当前标签页的过滤后数据
const displaySubsections = computed(() => {
  const q = norm(query.value)
  const currentSection = blockchainResourceSections[activeTab.value]
  
  if (!currentSection) return []

  if (!q) return currentSection.subsections

  return currentSection.subsections
    .map((sub) => ({
      title: sub.title,
      links: sub.links.filter(
        (l) =>
          norm(l.title).includes(q) ||
          norm(l.url).includes(q) ||
          (sub.title && norm(sub.title).includes(q))
      )
    }))
    .filter((sub) => sub.links.length > 0)
})
</script>
