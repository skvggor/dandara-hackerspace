<template>
  <div class="home">
    <PageGenerator :data="data.components" />
  </div>
</template>

<script>
import data from '~/data/content.json'
import PageGenerator from '~/components/PageGenerator'

export default {
  name: 'IndexPage',
  components: {
    PageGenerator,
  },
  data() {
    return {
      data,
    }
  },
}
</script>

<style>
html,
body {
  background-color: #fff;
  font-family: Barlow, sans-serif;
  margin: 0;
  padding: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing:border-box;
}

body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
ol,
ul {
  font-weight: normal;
  margin: 0;
  padding: 0;
}

ol,
ul {
  list-style: none;
}

img {
  height: auto;
  max-width: 100%;
}

.home {
  background-color: #202124;
  height: 100vh;
  padding: 40px 20px;
}
</style>
