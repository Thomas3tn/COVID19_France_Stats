<template>

    <router-link 
            :to="{path: '/', hash: '#search-section'}" 
            class="backToTopBtn" 
            title="Retour à la sélection"
        >
            <font-awesome-icon :icon="arrow" class="arrow" aria-hidden="true"/>
            Retour à la sélection
            <font-awesome-icon :icon="arrow" class="arrow" aria-hidden="true"/>
    </router-link>

</template>

<script>
import { faLongArrowAltUp } from "@fortawesome/free-solid-svg-icons";
export default {
    setup() {
        
        return {
            arrow: faLongArrowAltUp
        }

    }
}
</script>

<style lang="scss" scoped>
.backToTopBtn {
    display: block;
    background-color: $white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #303030;
    text-decoration: none;
    margin-top: 3vw;
    padding: 1vw 2vw;
    overflow: hidden;
    transition: all 300ms;
    &:hover {
        .arrow {
            transform: translate(0%);
            opacity: 1;
        }
    }
}
.arrow {
    transition: all 300ms;
    opacity: 0;
    transform: translateY(100%);
}
</style>