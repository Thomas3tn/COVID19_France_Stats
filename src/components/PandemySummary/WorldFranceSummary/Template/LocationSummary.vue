<template>

    <article :class="`container container--${locName}`">

        <div class="innerContainer">
            
            <div class="spellingContainer">
                <p class="spellingPara" aria-hidden="true">
                    <span 
                        v-for="letter in spelling" 
                        :key="letter"
                        class="spellingLetter"
                    >
                    {{ letter }}
                    </span>
                </p>
            </div>

            <div :class="`contentContainer contentContainer--${locName}`">
                <div :class="`img img--${locName}`">
                </div>
                <div class="textContainer" ref="textContainer">
                    <h2 class="header">
                        <slot name="header"></slot>
                    </h2>
                    <slot name="content"></slot>
                </div>
            </div>

        </div>

    </article>

</template>

<script>
import { computed } from "vue";

export default {
    props: {
        spelling: {
            type: Array,
            required: true,
            validator(value) {
                return ["france", "monde"].includes(value.join("").toLowerCase());
            }
        }
    },
    setup(props) {

        return {
            locName: computed(() => props.spelling.join("").toLowerCase())
        }

    },
}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3rem;
    @media (min-width: 1024px) {
        min-height: 34vw;
    }
    @media (min-width: 1440px) {
        padding: 0 3rem;
    }
    &--france {
        background-color: $primary;
    }
    &--monde {
        background-color: $secondary;
        color: $white;
    }
}

.innerContainer {
    display: flex;
    justify-content: center;
    position: relative;
    @media (min-width: 1232px) {
        right: -1.5%;
    }
}
.spellingContainer {
    display: none;
    @media (min-width: 1232px) {
        display: block;
        writing-mode: vertical-rl;
        text-orientation: upright;
        position: absolute;
        height: 100%;
        margin: 0;
        left: 0;
    }
}
.spellingPara {
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.spellingLetter {
    display: block;
}
.contentContainer {
    @media (min-width: 1232px) {
        display: grid;
        position: relative;
        right: 20%;
        grid-template-columns: 43% 70%;
        width: 94%;
    }
    &--france {
        background: url("../../../../assets/img/locationSummary/france/triumphalArcMobile.png") no-repeat center;
        background-size: contain;
        @media (min-width: 1232px) {
            background: none;
        }
    }
    &--monde {
        background: url("../../../../assets/img/locationSummary/world/worldGlobeMobile.png") no-repeat center;
        background-size: contain;
        @media (min-width: 1232px) {
            background: none;
        }
    }
}
.img {
    display: none;
    @media (min-width: 1232px) {
        display: block;
    }
    &--france {
        background: url("../../../../assets/img/locationSummary/france/triumphalArch.png") no-repeat right;
        background-size: contain;
    }
    &--monde {
        background: url("../../../../assets/img/locationSummary/world/worldGlobe.png") no-repeat right;
        background-size: contain;
    }
}
.textContainer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    @media (min-width: 1232px) {
        margin-left: 3%;
    }
    @media (min-width: 1232px) {
        display: block;
    }
    p {
        margin-bottom: 1rem;
        &:last-child {
            margin-bottom: -0.8%;
        }
    }
}
.header {
    text-align: center;
    margin: 0;
    margin-bottom: 1.5rem;
    margin-top: -1.8%;
    font-size: clamp(1.5rem, 2vw, 3.4rem);
    @media (min-width: 1232px) {
        text-align: left;
    }
}
.contentPara {
    margin: 0;
    line-height: 1.5;
    text-align: justify;
}

.titleHighlight {
    color: #EB4647;
    //font-size: 1.5em;
}
.contentHighlight {
    color: #e46061;
    font-weight: bold;
}
</style>

<style lang="scss">
.locationSummary__contentPara {
    margin: 0;
    margin-bottom: 1rem;
    line-height: 1.5;
    text-align: justify;
    &--last {
        margin-bottom: 0;
    }
}

.locationSummary__titleHighlight {
    color: #EB4647;
    font-size: 1.5em;
}

.locationSummary__contentHighlight {
    color: #e46061;
    font-weight: bold;
}
</style>