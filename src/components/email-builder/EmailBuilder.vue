<script lang="ts" setup>
import { type TReaderDocument } from '@usewaypoint/email-builder'
import { onMounted } from 'vue'
import { ReactConnector } from '../ReactConnector'

const CONFIGURATION: TReaderDocument = {
  root: {
    type: 'EmailLayout',
    data: {
      backdropColor: '#F8F8F8',
      canvasColor: '#FFFFFF',
      textColor: '#242424',
      fontFamily: 'MODERN_SANS',
      childrenIds: ['block-1709578146127'],
    },
  },
  'block-1709578146127': {
    type: 'Text',
    data: {
      style: {
        fontWeight: 'normal',
        padding: {
          top: 16,
          bottom: 16,
          right: 24,
          left: 24,
        },
      },
      props: {
        text: 'Hello world',
      },
    },
  },
}

onMounted(() => {
  // This is where you can perform any setup after the component is mounted
  console.log('EmailBuilder component mounted')

  const reactComponent = new ReactConnector(document.getElementById('builder') as HTMLElement)
  reactComponent.render({
    configuration: CONFIGURATION,
  })

  console.log(reactComponent)
})
</script>

<template>
  <div id="builder"></div>
</template>

<style scoped></style>
