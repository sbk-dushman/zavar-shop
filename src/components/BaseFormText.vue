<template>
              <BaseFormField  :title="title" :error="error">
              <input class="form__input" v-model="dataValue" type="text":placeholder="placeholder">
            </BaseFormField>
</template>
<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  mixins: [formFieldMixin],
};

</script>
<style>

</style>
