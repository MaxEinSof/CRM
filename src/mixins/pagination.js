import chunk from 'lodash.chunk'

export default {
  data () {
    return {
      itemsSubarray: [],
      pageCount: 1,
      activePage: 1
    }
  },
  computed: {
    selectedItems () {
      return this.itemsSubarray[this.activePage - 1]
    }
  },
  methods: {
    initPagination (allItems, itemsLimit = 10) {
      const complementedAllItems = allItems.map((item, index) => {
        return {
          ...item,
          tableNumber: index + 1
        }
      })

      this.itemsSubarray = chunk(complementedAllItems, itemsLimit)
      this.pageCount = this.itemsSubarray.length

      const routeQueryPage = +this.$route.query.page

      if (routeQueryPage) {
        if (routeQueryPage <= this.pageCount) {
          this.activePage = routeQueryPage
        } else {
          this.setPage()
        }
      } else if (this.pageCount > 1) {
        this.setPage()
      }
    },
    setPage () {
      this.$router.replace({
        query: {
          page: this.activePage
        }
      })
    }
  }
}
