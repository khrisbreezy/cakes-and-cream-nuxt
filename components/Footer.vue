<template>
     <footer class="fixed-bottom d-flex align-items-center justify-content-between">
      <p class="w-100">{{userTypeRoleDisplay()}} App. &copy; Cakes & Cream.</p>
    </footer>
</template>

<script>
  export default {
    data: () => ({
      userType: '',
      userRole: ''
    }),
    mounted() {
      this.userType = this.$cookies.get('userType');
    },
    methods: {
      userTypeRoleDisplay() {
        if (this.userType === 'customer service') {
          return this.userRole = "Customer Service";
        } else if (this.userType === 'cashier')  {
          return this.userRole = "Cashier"
        } else if (this.userType === 'message writer' || this.userType === 'message writer admin' ) {
          return this.userRole = "Message Writer"
        } else if (this.userType === 'logistics') {
          return  this.userRole = "Logistics"
        } else if (this.userType === 'production') {
          return this.userRole = "Production"
        } else if (this.userType === 'production manager') {
          return this.userRole = "Production Manager"
        } else if (this.userType === 'collection officer') {
          return this.userRole = "Collection Oficer"
        } 
      }
    }
  }
</script>