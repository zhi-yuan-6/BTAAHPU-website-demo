import { defineStore } from 'pinia'
import axios from 'axios'

const apiClient = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const useApiStore = defineStore('api', {
  state: () => ({
    // 协会信息
    association: null,
    // 成员列表
    members: [],
    // 活动列表
    events: [],
    // 竞赛列表
    competitions: [],
    // 获奖情况
    awards: [],
    // 友情链接
    friendLinks: [],
    // 加载状态
    loading: {
      association: false,
      members: false,
      events: false,
      competitions: false,
      awards: false,
      friendLinks: false
    },
    // 错误信息
    error: null
  }),

  actions: {
    // 获取协会信息
    async fetchAssociation() {
      this.loading.association = true
      try {
        const response = await apiClient.get('/association')
        this.association = response.data.value ? response.data.value : response.data
        this.error = null
      } catch (error) {
        console.error('获取协会信息失败:', error)
        this.error = '获取协会信息失败'
      } finally {
        this.loading.association = false
      }
    },

    // 获取成员列表
    async fetchMembers(params = {}) {
      this.loading.members = true
      try {
        const response = await apiClient.get('/members', { params })
        this.members = response.data
        this.error = null
      } catch (error) {
        console.error('获取成员列表失败:', error)
        this.error = '获取成员列表失败'
      } finally {
        this.loading.members = false
      }
    },

    // 获取活动列表
    async fetchEvents(params = {}) {
      this.loading.events = true
      try {
        const response = await apiClient.get('/events', { params })
        this.events = response.data.value ? response.data.value : response.data
        this.error = null
      } catch (error) {
        console.error('获取活动列表失败:', error)
        this.error = '获取活动列表失败'
      } finally {
        this.loading.events = false
      }
    },

    // 获取竞赛列表
    async fetchCompetitions(params = {}) {
      this.loading.competitions = true
      try {
        const response = await apiClient.get('/competitions', { params })
        this.competitions = response.data
        this.error = null
      } catch (error) {
        console.error('获取竞赛列表失败:', error)
        this.error = '获取竞赛列表失败'
      } finally {
        this.loading.competitions = false
      }
    },

    // 获取获奖情况
    async fetchAwards(params = {}) {
      this.loading.awards = true
      try {
        const response = await apiClient.get('/awards', { params })
        this.awards = response.data.value ? response.data.value : response.data
        this.error = null
      } catch (error) {
        console.error('获取获奖情况失败:', error)
        this.error = '获取获奖情况失败'
      } finally {
        this.loading.awards = false
      }
    },

    // 获取友情链接
    async fetchFriendLinks(params = {}) {
      this.loading.friendLinks = true
      try {
        const response = await apiClient.get('/friend-links', { params })
        this.friendLinks = response.data
        this.error = null
      } catch (error) {
        console.error('获取友情链接失败:', error)
        this.error = '获取友情链接失败'
      } finally {
        this.loading.friendLinks = false
      }
    },

    // 初始化所有数据
    async initialize() {
      await Promise.all([
        this.fetchAssociation(),
        this.fetchMembers(),
        this.fetchEvents(),
        this.fetchCompetitions(),
        this.fetchAwards(),
        this.fetchFriendLinks()
      ])
    }
  }
})