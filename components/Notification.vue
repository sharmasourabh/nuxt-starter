<template>
  <v-alert :value="true" type="error" dense text tile>{{ message }}</v-alert>
</template>

<script>
export default {
  name: "Notification",
  props: {
    message: {
      type: String,
      default: ""
    }
  }
};
</script>
