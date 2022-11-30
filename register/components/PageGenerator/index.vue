<template>
  <div class="components">
    <div
      v-for="component in data"
      :key="component.id"
      class="component"
    >
      <RegisterComponent
        v-if="component.name === 'register'"
        :data="component"
      />
    </div>
  </div>
</template>

<script>
import RegisterComponent from '~/components/Register'

export default {
  name: 'PageGenerator',
  components: {
    RegisterComponent,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
}
</script>
