<template>
    
    <button 
        class="btn" 
        @click="togglePanelDisplay" 
        title="Afficher les détails de la localisation"
    >
        <i 
            class="fas fa-chevron-right" 
            aria-hidden="true"
        >
            <span class="screenreaderText">
                Afficher les détails de la localisation
            </span>
        </i>
    </button>

</template>

<script>
export default {
    setup(props, context) {

        return {
            togglePanelDisplay: () => context.emit("toggle-location-panel-display")
        }

    }
}
</script>

<style lang="scss" scoped>
.btn {
    display: none;
    border: none;
    position: absolute;
    background-color: #FFF;
    left: -6%;
    top: 50%;
    height: 10%;
    transform: translateY(50%);
    border-radius: 0 4px 4px 0;
    &:hover {
        cursor: pointer;
    }
    @media (min-width: 1024px) {
        display: block;
    }
}
</style>