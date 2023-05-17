<template>
        <ul class="catalog__pagination pagination">
          <li class="pagination__item">
            <a href="#" @click.prevent="paginate(page, 0)"
            :class="{'pagination__link--disabled': (page - 1) <= 0}"
             class="pagination__link pagination__link--arrow" aria-label="Предыдущая страница">
              <svg width="8" height="14" fill="currentColor">
                <use xlink:href="#icon-arrow-left"></use>
              </svg>
            </a>
          </li>
          <li class="pagination__item" v-for="pageNumber in totalPages" :key="pageNumber">
            <a href="#" class="pagination__link"
             :class="{'pagination__link--current':pageNumber === page}"
             @click.prevent="paginate(pageNumber, 1)">
              {{pageNumber}}
            </a>
          </li>
          <!--  как сделать эту часть??
          <li class="pagination__item">
            <a class="pagination__link" href="#">
              ...
            </a>
          </li>
          <li class="pagination__item">
            <a class="pagination__link" href="#">
            30
            </a>
          </li> -->
          <li class="pagination__item">
            <a  href="#" @click.prevent="paginate(page, 2)"
            :class="{'pagination__link--disabled': (page + 1) > totalPages}"
            class="pagination__link pagination__link--arrow"
            aria-label="Следующая страница">
              <svg width="8" height="14" fill="currentColor">
                <use xlink:href="#icon-arrow-right"></use>
              </svg>
            </a>
          </li>
        </ul>
</template>
<script>
export default {
  props: ['page', 'count', 'perPage'],
  model: {
    prop: 'page',
    event: 'paginate',
  },
  methods: {
    paginate(page, type) {
      if (type === 0) {
        const pageBack = page - 1;
        this.$emit('paginate', pageBack);
      }
      if (type === 1) {
        this.$emit('paginate', page);
      }
      if (type === 2) {
        const pageForward = page + 1;
        this.$emit('paginate', pageForward);
      }
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.count / this.perPage);
    },
  },
};
</script>
<style>
.pagination__link--disabled {
  /* pointer-events: none; */
}
</style>
