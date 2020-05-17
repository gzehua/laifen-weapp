<template>
  <td :class="classNames">
    <div v-if="isLine" :class="lineClass"></div>
    {{className}}
  </td>
</template>
<script>
  export default {
    name: 'cell',
    data() {
      return {
        styleName: ''
      }
    },
    props: ['isSelected', 'isBlank', 'className', 'lineClass', 'isLine'],
    computed: {
      classNames() {
        if (this.isBlank) {
          return 'blank'
        } else if (this.isSelected) {
          return 'selected '+this.className
        } else {
          return this.className
        }
        // return {
        //   'selected': this.isSelected, // 选中
        //   'blank': this.isBlank, // 空白
        // }
      }
    }
  }
</script>
