<template>
  <div>
    <div class="page-title">
      <h3> {{ 'Categories' | i18n }} </h3>
    </div>

    <section>
      <div class="row">
        <categories-create/>

        <categories-edit/>
      </div>
    </section>
  </div>
</template>

<script>
import CategoriesCreate from '@/components/categories/CategoriesCreate'
import CategoriesEdit from '@/components/categories/CategoriesEdit'

export default {
  metaInfo () {
    return {
      title: this.$getTitle('Categories')
    }
  },
  components: { CategoriesCreate, CategoriesEdit }
}
</script>
