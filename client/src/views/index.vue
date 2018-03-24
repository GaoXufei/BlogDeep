<template>
  <div class="container">
    <div class="route">
      <ul class="routeTitle">
        <li>
          <dl>
            <dt>
              <h1>HOME　PAGE</h1>
            </dt>
            <dd>Your personal character directly affects your ability to write computer programs.</dd>
          </dl>
        </li>
        <li>
          <router-link to="posts">Blog</router-link>
        </li>
        <li>
          <a href="https://github.com/GaoXufei">github</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  
}
</script>

<style lang="scss" scoped>
  @import "../styles/componentStyle/index";
</style>
