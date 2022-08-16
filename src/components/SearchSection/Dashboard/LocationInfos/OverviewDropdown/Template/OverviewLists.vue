<template>

    <div>

        <ul 
            v-for="name in names" 
            :key="name"
            class="list"
        >
            <slot :name="name"></slot>
        </ul>

    </div>

</template>

<script>
export default {
    props: {
        names: {
            type: Array,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
.list {
    border-bottom: 1px solid #000000;
    padding-bottom: 0.5rem;
    list-style-type: square;
    &:last-of-type {
        border-bottom: none;
    }
    li {
        position: relative;
        right: clamp(7%, 2%);
        //Add vertical margin for high resolution screen
        margin: 0.1vw 0;
        abbr {
            cursor: help;
        }
    }
}
.listBtn {
    border: none;
    background-color: inherit;
    &:hover {
        cursor: pointer;
    }
}
</style>

<style lang="scss">
.list {
    &:last-of-type {
        border-bottom: none;
    }
    li {
        position: relative;
        right: clamp(7%, 2%);
        //Add vertical margin for high resolution screen
        margin: 0.1vw 0;
        abbr {
            cursor: help;
        }
    }
}
</style>