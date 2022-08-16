<template>
    
    <a 
        :class="`externalLink externalLink--${type}`" 
        :href="linkContent.URL" 
        :title="linkContent.TITLE"
    >
        <div 
            :class="`headerContainer headerContainer--${type}`"
        >
            <h3 
                class="header"
            >
                {{ linkContent.HEADER }}
                <i 
                    v-if="arrowPosition === 'horizontal'"
                    :class="`fas fa-long-arrow-alt-right arrow arrow--horizontal`" 
                    aria-hidden="true"
                >
                </i>
            </h3>
            <i 
                v-if="arrowPosition === 'vertical'"
                class="fas fa-long-arrow-alt-down arrow arrow--vertical" 
                aria-hidden="true"
            ></i>
        </div>
        <img 
            :class="`img img--${type}`" 
            :src="require(`@/assets/img/externalLinks/${linkContent.IMG}.jpg`)" 
            :alt="linkContent.ALT_TEXT"
        />
        <div 
            aria-hidden="true"
            class="layer"
        ></div>
    </a>

</template>

<script>
export default {
    props: {
        linkContent: {
            type: Object,
            required: true
        },
        arrowPosition: {
            type: String,
            required: false,
            default: null,
            validator(value) {
                return ["horizontal", "vertical"].includes(value)
            }
        },
        type: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
.externalLink {
    display: block;
    text-decoration: none;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    min-height: 15rem;
    @media (min-width: 1024px) {
        min-height: 12rem;
        &--one {
            grid-column: 1/3;
            grid-row: 1;
        }
        &--two {
            grid-column: 3 / 5;
            grid-row: 1/3;
        }
        &--three {
            grid-column: 1;
            grid-row: 2/4;
        }
        &--five {
            grid-column: 2/5;
            justify-content: left;
        }
    }
    @media (min-width: 1440px) {
        min-height: 14rem;
    }
    //Does not apply hover effect on the header div
    &:hover:not(div) {
        cursor: pointer;
        img {
            transform: scale(1.05);
        }
        .arrow--vertical {
            transform: translateY(25%);
        }
        .arrow--horizontal {
            transform: translateX(25%);
        }
    }
}

.headerContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 1;
    text-align: center;
    color: $white;
    &--two {
        width: 50%;
        @media (min-width: 1024px) {
            width: 80%;
        }
    }
    &--three {
        width: 85%;
    }
    &--four {
        width: 85%;
    }
    &--five {
        width: 70%;
        text-align: left;
        @media (min-width: 768px) {
            width: 50%;
        }
        @media (min-width: 1024px) {
            position: relative;
            left: 5.5%;
        }
    }
}

.header {
    margin: 0;
    + i, > i {
        font-size: clamp(1.8rem, 3vw, 5rem);
    }
}

.arrow {
    transition: all 300ms ease-out;
    &--horizontal {
        transform: translateX(0%);
        transform-origin: left;
    }
    &--vertical {
        transform-origin: top;
        transform: translateY(0%);
    }
}
.layer {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(0deg, #00000047 15%, #ffffff00 100%);
}
.img {
    max-width: 100%;
    transform: scale(1);
    transition: all 300ms ease-out;
    position: absolute;
    -webkit-user-drag: none;
    &--one {
        min-height: 100%;
        min-width: 100%;
        object-fit: cover;
    }
    &--two {
        min-width: 100%;
        min-height: 100%;
        object-fit: cover;
    }
    &--three {
        top: -20%;
        min-height: 100%;
        min-width: 100%;
        object-fit: cover;
        @media (min-width: 768px) {
            top: -80%;
        }
        @media (min-width: 1024px) {
            top: 0%;
        }
    }
    &--four {
        min-height: 100%;
        min-width: 100%;
        object-fit: cover;
    }
    &--five {
        height: 100%;
        max-width: fit-content;
        background-image: linear-gradient(0deg, #00000088 30%, #ffffff44 100%);
        @media (min-width: 768px) {
            height: auto;
            margin-top: -8%;
            max-width: 100%;
        }
    }
}
</style>