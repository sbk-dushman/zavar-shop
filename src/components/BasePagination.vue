<template>
        <ul class="catalog__pagination pagination">
          <li class="pagination__item">
            <a class="pagination__link pagination__link--arrow pagination__link--disabled" aria-label="Предыдущая страница">
              <svg width="8" height="14" fill="currentColor">
                <use xlink:href="#icon-arrow-left"></use>
              </svg>
            </a>
          </li>
          <li class="pagination__item" v-for="pageNumber in totalPages" :key="pageNumber">
            <a class="pagination__link pagination__link--current">
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
            <a class="pagination__link pagination__link--arrow" href="#" aria-label="Следующая страница">
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
  computed: {
    totalPages() {
      return Math.ceil(this.count / this.perPage);
    },
  },
};
</script>
