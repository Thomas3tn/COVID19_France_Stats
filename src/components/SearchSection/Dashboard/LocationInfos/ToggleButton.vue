<template>

    <button 
        class="btn" 
        title="Cacher les détails de la localisation" 
        @click="togglePanelDisplay"
    >

        <font-awesome-icon 
            :icon="chevron" 
            aria-hidden="true"
        />

        <span 
            class="screenreaderText"
        >
        Cacher les détails de la localisation
        </span>
        
    </button>

</template>

<script>
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
export default {
    setup(props, context) {
        
        return {
            togglePanelDisplay: () => context.emit("toggle-location-panel-display"),
            chevron: faChevronLeft
        }

    }
}
</script>

<style lang="scss" scoped>
.btn {
    z-index: -1;
    opacity: 0;
    display: none;
    height: 10%;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 100%;
    top: 50%;
    transform: translate(100%, 50%);
    transition: transform 300ms 0ms ease-in-out, opacity 150ms 150ms ease-in-out;
    background-color: inherit;
    border-radius: 4px 0 0 4px;
    border: none;
    @media (min-width: 1024px) {
        display: flex;
    }
    &:hover {
        cursor: pointer;
        transform: translate(0%, 50%);
        opacity: 1;
    }
}
</style>