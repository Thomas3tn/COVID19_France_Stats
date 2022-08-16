<template>

    <div class="headerContainer">

        <font-awesome-icon 
            :icon="icon" 
            class="icon"
            aria-hidden="true"
        />

        <h3 class="header"> {{ title }}</h3>
        
    </div>

</template>

<script>
export default {
    props: {
        icon: {
            type: Object,
            required: true
        },
        title: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
.headerContainer {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.header {
    font-size: clamp(1.5rem, 1vw, 5rem);
    margin: 0;
}
.icon {
    font-size: clamp(1.5rem, 1vw, 5rem);
    margin-right: 1rem;
}
</style>