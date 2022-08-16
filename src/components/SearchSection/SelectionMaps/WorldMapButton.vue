<template>

    <button @click="loadWorldMap" class="btn" title="Retour au planisphère">
        <font-awesome-icon :icon="faAngleLeft" class="btn__arrow"/>
        <font-awesome-icon :icon="globe" class="btn__globe"/>
    </button>

</template>

<script>
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
    setup(props, context) {

        const store = useStore();

        return {
            loadWorldMap: () => context.emit("world-map-button-click"),
            globe: computed(() => store.state.DashboardAssets.ICONS.LOCATION.NORTH_AMERICA),
            faAngleLeft
        }

    }
}
</script>

<style lang="scss" scoped>
@keyframes buttonAppearance {
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0%);
    }
}

@keyframes buttonDisappearance {
    from {
        transform: translateX(0%);
    }
    to {
        transform: translateX(-100%);
    }
}

@keyframes arrowAnimationOnHover {
    0% {
        transform: translateX(0%);
    }
    50% {
        transform: translateX(-50%);
    }
    100% {
        transform: translateX(0%);
    }
}
.btn {
    border-radius: 0 2px 2px 0;
    padding: 2rem 0.5rem;
    background-color: #334455;
    color: $white;
    animation: buttonAppearance 500ms ease-out both;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 2rem;
    border: none;
    &:hover {
        cursor: pointer;
        .btn__arrow {
            animation: arrowAnimationOnHover 1000ms ease-in-out both infinite;
        }
    }
    &__globe {
        margin-left: 0.5rem;
    }
}
</style>