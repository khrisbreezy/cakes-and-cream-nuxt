<template>
    <div class="col-12">
        <div class="sort-head">
            <div class="date">
                <p class="day-num">{{ currentDate }}</p>
                <span>
                    <p class="day">{{ week }}</p>
                    <p class="year">{{ month }} {{ year }}</p>
                </span>
            </div>
            <div class="sorting-form">
                <div id="myOverlay" class="overlay">
                    <div class="overlay-content d-flex align-items-center">
                        <span><img src="~assets/images/search.svg" alt=""/></span>
                        <input @input="debounceSearch" ref="searchInput" class="search-input" type="text"/>
                        <div class="closebtn" @click="closeSearch">
                            <img src="~assets/images/i-close.svg" alt=""/>
                        </div>
                    </div>
                </div>
                <button class="openBtn" @click="openSearch">
                    <img src="~assets/images/search.svg" alt=""/>
                </button>
                <button class="openBtn sort-icon">
                    <span class="datepicker-toggle-button"></span>
                    <!-- <img src="~assets/images/calendar.svg" alt=""/> -->
                    <input type="date" v-model="today" @change="changeDateHandler" class="datepicker-input">
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import debounce from 'lodash/debounce';
export default {
    props: ['cancelCount', 'date'],
    data: () => ({
        month: "",
        week: "",
        year: "",
        currentDate: "",
        today: "",
        monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Augt", "Sept", "Oct", "Nov", "Dec"],
        weekNames: ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"],
    }),
    watch: {
        cancelCount() {
            this.$refs.searchInput.value = '';
            document.getElementById("myOverlay").style.display = "none";
        },
        date() {
            this.fetchDate();
        } 
    },
    created() {
        // const d = new Date();
         this.fetchDate();
        // this.$emit('todayDate', this.formatDate(d));
    },
    mounted() {
        
    },
    methods: {
        fetchDate() {
            this.month = this.monthNames[this.date.getMonth()];
            this.week = this.weekNames[this.date.getDay()];
            this.year = this.date.getFullYear();
            this.currentDate = this.date.getDate();
        },
        openSearch() {
            document.getElementById("myOverlay").style.display = "block";
        },
        closeSearch() {
            document.getElementById("myOverlay").style.display = "none";
            this.$emit('searchClosed');
        },
        debounceSearch: debounce(function (e) {
            this.$emit('onSearchEntered', e.target.value);
        }, 500),
        changeDateHandler() {
            const d = new Date(this.today);
            this.month = this.monthNames[d.getMonth()];
            this.week = this.weekNames[d.getDay()];
            this.year = d.getFullYear();
            this.currentDate = d.getDate();

            this.$emit('dateChanged', this.formatDate(d));
        },
        formatDate(d) {
            let month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }
    }
}
</script>

<style>
.openBtn {
    margin-bottom: 10px;
}

.col-12 {
    border-bottom: 1px solid #eee;
}

 @media only screen and (min-width: 767px) {
    .col-12 {
        border-bottom: none
    }  
}

.sort-icon {
    display: inline-block;
    position: relative;
    width: 30px;
    height: 30px;
}

.datepicker-toggle-button {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url('~assets/images/calendar.svg');
  background-repeat: no-repeat;
}

.datepicker-input {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  box-sizing: border-box;
}
.datepicker-input::-webkit-calendar-picker-indicator {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  cursor: pointer;
}

</style>
