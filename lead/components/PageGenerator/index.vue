<template>
  <div class="components">
    <div
      v-for="component in data"
      :key="component.id"
      class="component"
    >
      <LeadComponent
        v-if="component.name === 'lead'"
        :data="component"
      />
    </div>
  </div>
</template>

<script>
import LeadComponent from '~/components/Lead'

export default {
  name: 'PageGenerator',
  components: {
    LeadComponent,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
}
</script>
