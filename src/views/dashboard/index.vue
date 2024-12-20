<template>
  <div class="dashboard-container">
    <div class="welcome-message">
      <h1>欢迎登陆</h1>
      <p>请在左侧菜单栏中，进行操作。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard'
}
</script>

<style scoped>
.dashboard-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.welcome-message {
  text-align: center;
  background: #fff;
  padding: 50px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.welcome-message h1 {
  font-size: 36px;
  margin-bottom: 20px;
}

.welcome-message p {
  font-size: 18px;
  color: #666;
}
</style>
