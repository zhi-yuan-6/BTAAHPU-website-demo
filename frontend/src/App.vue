<template>
  <div class="min-h-screen">
    <!-- 背景装饰 -->
    <div class="fixed inset-0 z-[-1] pointer-events-none">
      <div class="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-primary rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse-slow"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-brand-accent rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse-slow" style="animation-delay: 2s;"></div>
      <div class="absolute inset-0 bg-grid z-[-1]"></div>
    </div>

    <!-- 顶部导航栏 -->
    <nav class="fixed w-full z-50 glass-nav transition-all duration-300" id="navbar">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          <!-- Logo -->
          <div class="flex-shrink-0 flex items-center gap-3 cursor-pointer" @click="$router.push('/')">
            <img src="/AHPU.png" alt="AHPU Logo" class="h-10 w-auto object-contain">
            <span class="font-mono font-bold text-xl tracking-wide text-white">AHPU<span class="text-brand-primary">.DAO</span></span>
          </div>
          
          <!-- Desktop Menu -->
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-8">
              <a href="#" class="hover:text-brand-cyan transition-colors px-3 py-2 rounded-md text-sm font-medium" @click.prevent="$router.push('/')">首页</a>
              <a href="#" class="hover:text-brand-cyan transition-colors px-3 py-2 rounded-md text-sm font-medium" @click.prevent="$router.push('/about')">关于协会</a>
              <a href="#" class="hover:text-brand-cyan transition-colors px-3 py-2 rounded-md text-sm font-medium" @click.prevent="$router.push('/team')">核心团队</a>
              <a href="#" class="hover:text-brand-cyan transition-colors px-3 py-2 rounded-md text-sm font-medium" @click.prevent="$router.push('/events')">精彩活动</a>
              <a href="#" class="hover:text-brand-cyan transition-colors px-3 py-2 rounded-md text-sm font-medium" @click.prevent="$router.push('/competitions')">竞赛信息</a>
              <a href="#" class="bg-white/10 hover:bg-brand-primary hover:text-white border border-white/10 text-white px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-brand-primary/50" @click.prevent="$router.push('/join')">
                加入我们
              </a>
            </div>
          </div>

          <!-- Mobile menu button -->
          <div class="-mr-2 flex md:hidden">
            <button type="button" @click="toggleMobileMenu" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none">
              <i class="fa-solid fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div class="md:hidden hidden bg-brand-dark/95 backdrop-blur-xl border-b border-white/10 absolute w-full" id="mobile-menu" :class="{ 'hidden': !mobileMenuOpen }">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="#" class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" @click.prevent="$router.push('/'); toggleMobileMenu">首页</a>
          <a href="#" class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" @click.prevent="$router.push('/about'); toggleMobileMenu">关于协会</a>
          <a href="#" class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" @click.prevent="$router.push('/team'); toggleMobileMenu">核心团队</a>
          <a href="#" class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" @click.prevent="$router.push('/events'); toggleMobileMenu">精彩活动</a>
          <a href="#" class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" @click.prevent="$router.push('/competitions'); toggleMobileMenu">竞赛信息</a>
          <a href="#" class="text-brand-cyan block px-3 py-2 rounded-md text-base font-medium font-bold" @click.prevent="$router.push('/join'); toggleMobileMenu">加入我们</a>
        </div>
      </div>
    </nav>

    <!-- 侧边极简导航栏 (保留) -->
    <nav class="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-6">
      <a href="#" class="nav-dot group relative w-3 h-3 rounded-full border border-white/50 bg-transparent hover:bg-white/20" @click.prevent="$router.push('/')">
        <span class="nav-tooltip absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 px-2 py-1 rounded text-xs text-white whitespace-nowrap backdrop-blur">首页</span>
      </a>
      <a href="#" class="nav-dot group relative w-3 h-3 rounded-full border border-white/50 bg-transparent hover:bg-white/20" @click.prevent="$router.push('/about')">
        <span class="nav-tooltip absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 px-2 py-1 rounded text-xs text-white whitespace-nowrap backdrop-blur">关于</span>
      </a>
      <a href="#" class="nav-dot group relative w-3 h-3 rounded-full border border-white/50 bg-transparent hover:bg-white/20" @click.prevent="$router.push('/team')">
        <span class="nav-tooltip absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 px-2 py-1 rounded text-xs text-white whitespace-nowrap backdrop-blur">团队</span>
      </a>
      <a href="#" class="nav-dot group relative w-3 h-3 rounded-full border border-white/50 bg-transparent hover:bg-white/20" @click.prevent="$router.push('/events')">
        <span class="nav-tooltip absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 px-2 py-1 rounded text-xs text-white whitespace-nowrap backdrop-blur">活动</span>
      </a>
      <a href="#" class="nav-dot group relative w-3 h-3 rounded-full border border-white/50 bg-transparent hover:bg-white/20" @click.prevent="$router.push('/competitions')">
        <span class="nav-tooltip absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 px-2 py-1 rounded text-xs text-white whitespace-nowrap backdrop-blur">竞赛</span>
      </a>
      <a href="#" class="nav-dot group relative w-3 h-3 rounded-full border border-white/50 bg-transparent hover:bg-white/20" @click.prevent="$router.push('/join')">
        <span class="nav-tooltip absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 px-2 py-1 rounded text-xs text-white whitespace-nowrap backdrop-blur">加入</span>
      </a>
    </nav>

    <!-- 主内容区域 -->
    <main class="pt-20">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- 页脚 -->
    <footer class="border-t border-white/5 bg-black/40 pt-16 pb-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <!-- Logo & Intro -->
          <div class="col-span-1 lg:col-span-2">
            <div class="flex items-center gap-2 mb-4">
              <img src="/AHPU.png" alt="Logo" class="h-8 w-auto">
              <span class="font-mono font-bold text-xl">AHPU.DAO</span>
            </div>
            <p class="text-gray-500 text-sm max-w-sm mb-6" v-if="association">
              {{ association.description }}
            </p>
            <div class="flex gap-4">
              <a href="#" class="text-gray-400 hover:text-white transition-colors"><i class="fa-brands fa-weixin text-xl"></i></a>
              <a href="https://github.com/cprgzn/BTAAHPU-website-demo" class="text-gray-400 hover:text-white transition-colors"><i class="fa-brands fa-github text-xl"></i></a>
              <a href="#" class="text-gray-400 hover:text-white transition-colors"><i class="fa-brands fa-qq text-xl"></i></a>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="font-bold mb-4 text-white">快速链接</h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><a href="#" class="hover:text-brand-primary transition-colors" @click.prevent="$router.push('/about')">关于我们</a></li>
              <li><a href="#" class="hover:text-brand-primary transition-colors" @click.prevent="$router.push('/events')">近期活动</a></li>
              <li><a href="#" class="hover:text-brand-primary transition-colors" @click.prevent="$router.push('/competitions')">竞赛信息</a></li>
              <li><a href="#" class="hover:text-brand-primary transition-colors" @click.prevent="$router.push('/team')">核心团队</a></li>
              <li><a href="#" class="hover:text-brand-primary transition-colors" @click.prevent="$router.push('/join')">加入招新群</a></li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h4 class="font-bold mb-4 text-white">联系我们</h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-location-dot mt-1"></i>
                <span>安徽工程大学<br>师生活动中心</span>
              </li>
              <li class="flex items-center gap-2">
                <i class="fa-brands fa-weixin"></i>
                <span>AHPU_Blockchain</span>
              </li>
            </ul>
          </div>

          <!-- Friendly Links -->
          <div>
            <h4 class="font-bold mb-4 text-white">友情链接</h4>
            <div v-if="friendLinks.length > 0">
              <div v-for="category in getUniqueCategories()" :key="category" class="mb-4">
                <p class="text-xs text-gray-500 uppercase font-semibold mb-1">{{ category }}</p>
                <ul class="space-y-1 text-sm text-gray-400">
                  <li v-for="link in getLinksByCategory(category)" :key="link.id">
                    <a :href="link.url" target="_blank" class="hover:text-brand-primary transition-colors">{{ link.name }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div class="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-gray-600 text-sm">© {{ new Date().getFullYear() }} AHPU.DAO. All rights reserved.</p>
          <div class="flex gap-4 text-gray-600 text-sm">
            <a href="#" class="hover:text-gray-400">隐私政策</a>
            <a href="#" class="hover:text-gray-400">免责声明</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { useApiStore } from './stores/api'
import { useRoute } from 'vue-router'

const apiStore = useApiStore()
const mobileMenuOpen = ref(false)
const route = useRoute()

// 切换移动端菜单
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

// 获取协会信息
const association = computed(() => apiStore.association)

// 获取友情链接
const friendLinks = computed(() => apiStore.friendLinks)

// 获取唯一分类
const getUniqueCategories = () => {
  const categories = friendLinks.value.map(link => link.category)
  return [...new Set(categories)]
}

// 根据分类获取链接
const getLinksByCategory = (category) => {
  return friendLinks.value.filter(link => link.category === category)
}

// 初始化数据
onMounted(async () => {
  await apiStore.initialize()
})

let revealObserver = null
let observedElements = []

const setupRevealObserver = async () => {
  await nextTick()

  // 清理旧 observer
  if (revealObserver) {
    observedElements.forEach((el) => revealObserver.unobserve(el))
    observedElements = []
    revealObserver.disconnect()
    revealObserver = null
  }

  const elements = Array.from(document.querySelectorAll('.reveal'))
  if (elements.length === 0) return

  // IntersectionObserver 不可用时直接显示
  if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
    elements.forEach((el) => el.classList.add('active'))
    return
  }

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
          revealObserver?.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
  )

  elements.forEach((el) => {
    observedElements.push(el)
    revealObserver.observe(el)
  })
}

onMounted(() => {
  setupRevealObserver()
})

watch(
  () => route.fullPath,
  async () => {
    await setupRevealObserver()
  }
)

onBeforeUnmount(() => {
  if (revealObserver) {
    observedElements.forEach((el) => revealObserver.unobserve(el))
    revealObserver.disconnect()
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>