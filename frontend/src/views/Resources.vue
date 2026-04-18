<template>
  <section class="min-h-screen py-24 bg-black/20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div class="text-center mb-12 reveal">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">学习资源</h2>
        <p class="text-gray-400 max-w-2xl mx-auto">
          精选区块链相关教程、文档、工具与社区链接（来自协会成员整理的书签，按主题分类便于检索）。
        </p>
      </div>

      <div class="max-w-xl mx-auto mb-10 reveal">
        <div class="relative">
          <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm"></i>
          <input
            v-model.trim="query"
            type="search"
            placeholder="搜索标题或链接…"
            class="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary/40"
            autocomplete="off"
          />
        </div>
      </div>

      <div v-if="filteredSections.length === 0" class="text-center text-gray-500 py-16 reveal">
        没有匹配的链接，请尝试其它关键词。
      </div>

      <div v-else class="space-y-14">
        <div
          v-for="block in filteredSections"
          :key="block.section"
          class="reveal"
        >
          <h3 class="text-xl md:text-2xl font-bold text-brand-cyan mb-6 flex items-center gap-3">
            <span class="h-1 w-8 rounded-full bg-brand-primary"></span>
            {{ block.section }}
          </h3>

          <div class="space-y-8">
            <div
              v-for="(sub, si) in block.subsections"
              :key="si + (sub.title || 'root')"
              v-show="sub.links.length > 0"
              class="glass rounded-2xl border border-white/5 overflow-hidden"
            >
              <div
                v-if="sub.title"
                class="px-5 py-3 border-b border-white/5 bg-white/[0.03] text-sm font-semibold text-gray-300"
              >
                {{ sub.title }}
              </div>
              <ul class="divide-y divide-white/5">
                <li
                  v-for="(link, li) in sub.links"
                  :key="li + link.url"
                  class="group"
                >
                  <a
                    :href="link.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-start gap-4 px-5 py-4 hover:bg-white/[0.04] transition-colors"
                  >
                    <span class="mt-0.5 text-brand-primary opacity-80 group-hover:opacity-100">
                      <i class="fa-solid fa-arrow-up-right-from-square text-sm"></i>
                    </span>
                    <span class="min-w-0 flex-1">
                      <span class="font-medium text-white group-hover:text-brand-cyan transition-colors block truncate">
                        {{ link.title }}
                      </span>
                      <span class="text-xs text-gray-500 break-all line-clamp-2 mt-1">{{ link.url }}</span>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
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

const norm = (s) => (s || '').toLowerCase()

const filteredSections = computed(() => {
  const q = norm(query.value)
  if (!q) return blockchainResourceSections

  return blockchainResourceSections
    .map((block) => {
      const subsections = block.subsections
        .map((sub) => ({
          title: sub.title,
          links: sub.links.filter(
            (l) =>
              norm(l.title).includes(q) ||
              norm(l.url).includes(q) ||
              norm(block.section).includes(q) ||
              (sub.title && norm(sub.title).includes(q))
          )
        }))
        .filter((sub) => sub.links.length > 0)

      return { section: block.section, subsections }
    })
    .filter((block) => block.subsections.length > 0)
})
</script>
