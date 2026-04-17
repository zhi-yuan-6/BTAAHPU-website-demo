<template>
  <section class="min-h-screen py-24 relative overflow-hidden flex items-center">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-primary/20 blur-[100px] rounded-full pointer-events-none"></div>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
      <div class="glass rounded-3xl p-8 md:p-16 text-center border border-brand-primary/30 shadow-2xl shadow-brand-primary/10 reveal">
        <h2 class="text-3xl md:text-5xl font-bold mb-6">加入 AHPU.DAO</h2>
        <p class="text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
          对区块链充满好奇？想找到志同道合的伙伴？<br>扫描下方二维码加入我们的招新群，或直接联系负责人。
        </p>
        
        <div class="flex flex-col md:flex-row justify-center items-center gap-12">
          <!-- QR Code Placeholder -->
          <div class="bg-white p-4 rounded-2xl shadow-xl">
            <!-- 这里使用占位图，实际使用时请替换为真实的微信群二维码图片 -->
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://github.com" alt="招新群二维码" class="w-48 h-48 object-contain">
            <p class="text-gray-900 text-center text-sm mt-2 font-bold">扫码加入招新群(测试案例 请不要扫码)</p>
          </div>

          <!-- Contact Info -->
          <div class="text-left space-y-6">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary text-xl">
                <i class="fa-brands fa-weixin"></i>
              </div>
              <div>
                <p class="text-gray-400 text-sm">官方微信 (会长)</p>
                <p class="text-xl font-bold text-white">AHPU_Blockchain</p>
              </div>
            </div>
            
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-brand-accent/20 flex items-center justify-center text-brand-accent text-xl">
                <i class="fa-regular fa-envelope"></i>
              </div>
              <div>
                <p class="text-gray-400 text-sm">合作/咨询邮箱</p>
                <p class="text-xl font-bold text-white">contact@ahpu-dao.org</p>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-brand-cyan/20 flex items-center justify-center text-brand-cyan text-xl">
                <i class="fa-solid fa-location-dot"></i>
              </div>
              <div>
                <p class="text-gray-400 text-sm">线下活动地点</p>
                <p class="text-xl font-bold text-white">师生活动中心 302</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// 加入我们页面组件
</script>