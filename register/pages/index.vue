<template>
  <div class="container">
    <video
      class="bg-video"
      loop
      autoplay
      muted
    >
      <source
        src="/bg.mp4"
        type="video/mp4"
      >
    </video>

    <div class="bg-pattern">
      <img src="/bg-pattern.png" alt="pattern" />
    </div>

    <div class="home">
      <PageGenerator :data="data.components" />
    </div>
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
  background-color: #000;
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

.bg-video {
  height: 100%;
  object-fit: cover;
  position: fixed;
  width: 100%;
  z-index: 1;
}

.bg-pattern {
  background-image: url("/bg-pattern.png");
  height: 100%;
  position: fixed;
  width: 100%;
  z-index: 2;
}

.home {
  background-color: transparent;
  position: relative;
  margin: 0 auto;
  max-width: 1440px;
  padding: 20px 20px 0;
  z-index: 3;
}

@media (min-width: 1024px) {
  .home {
    padding: 40px 40px 0;
  }
}
</style>
