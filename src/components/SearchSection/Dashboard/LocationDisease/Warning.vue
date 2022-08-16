<template>
    
    <div 
        v-if="hasWindowBeenClosed === false"
        class="warningPanel datasPanel"
        :class="warningPanelClasses"
    >

        <font-awesome-icon 
            :icon="logo" 
            class="warningSign"
        />
        
        <p class="content">
            <slot name="content"></slot>
        </p>

        <button 
            class="closeBtn"
            title="Fermer le panneau"
            @click="hasWindowBeenClosed = true"
        >
            <span class="screenreaderText">Fermer le panneau</span>
            <font-awesome-icon 
                :icon="faTimes" 
                class="closeBtn__icon"
            />
        </button>

    </div>

</template>

<script>
import { computed, ref } from "vue";
import { faExclamationTriangle, faServer, faTimes } from "@fortawesome/free-solid-svg-icons";

export default {
    props: {
        alertType: {
            type: String,
            required: true,
            validator(value) {
                return ["CONTROVERSIAL_SOURCES", "INCOMPLETE_SOURCES"].includes(value);
            }
        }
    },
    setup(props) {

        const LOGOS = {
            CONTROVERSIAL_SOURCES: faExclamationTriangle,
            INCOMPLETE_SOURCES: faServer
        };

        const hasWindowBeenClosed = ref(false);

        const logo = computed(() => LOGOS[props.alertType]);
        const warningPanelClasses = computed(() => `warningPanel--${props.alertType.split("_")[0].toLowerCase()}`);

        return {
            hasWindowBeenClosed,
            logo,
            warningPanelClasses,
            faTimes
        }

    },
}
</script>

<style lang="scss" scoped>
.closeBtn {
    position: absolute;
    right: 0;
    top: 0;
    border: none;
    background-color: inherit;
    color: inherit;
    padding: 0;
    transition: all 300ms;
    &:hover {
        cursor: pointer;
        color: darken(#FFF, 7%);
    }
    &__icon {
        position: relative;
        right: 20%;
    }
}
.warningPanel {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 3px;
    padding: 1rem;
    margin: 3vw 0;
    color: #FFF;
    &--controversial {
        background-color: lighten(#ffa600, 7%);
    }
    &--incomplete {
        background-color: lighten($secondary-dark, 10%);
    }
}
.warningSign {
    font-size: 2rem;
    margin-right: 1rem;
}
.content {
    margin: 0;
    flex: 1;
}
</style>