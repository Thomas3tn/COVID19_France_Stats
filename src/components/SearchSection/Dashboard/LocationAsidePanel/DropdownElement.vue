<template>
    <details class="dropdownElement" :id="detailsElementId + 'DropdownElement'" @toggle="isContentDisplayed = !isContentDisplayed">
        <summary class="dropdownElement__summaryContainer" title="Inverser l'affichage">
            <slot name="header"></slot>
            <i class="fas fa-chevron-down dropdownElement__chevronLogo"></i>
        </summary>
        <slot name="content"></slot>
    </details>
</template>

<script>
//Vue Element
import { ref, watch, onMounted } from "vue";

export default {
    props: {
        detailsElementId: {
            type: String,
            required: true
        },
        openByDefault: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    setup(props) {

        let isContentDisplayed = ref(false);

        watch(() => isContentDisplayed.value, newValue => {

            let chevronClasses = document.getElementById(props.detailsElementId + "DropdownElement").firstElementChild.lastElementChild.className;
            console.log(chevronClasses);
            let chevronClassesArray = chevronClasses.split(" ");

            for (let i = 0; i < chevronClassesArray.length; i++) {

                if ((newValue === true && chevronClassesArray[i] === "chevronUpsideDown") || (newValue === false && chevronClassesArray[i] === "chevronNormalPosition")) {
                    chevronClassesArray.splice(i, 1);
                    break;
                }

            }

            newValue === true ? chevronClassesArray.push("chevronNormalPosition") : chevronClassesArray.push("chevronUpsideDown");
            document.getElementById(props.detailsElementId + "DropdownElement").firstElementChild.lastElementChild.className = chevronClassesArray.join(" ");

        });

        onMounted(() => {
            
            if (props.openByDefault === true) {
                document.getElementById(props.detailsElementId + "DropdownElement").setAttribute("open", "true");
            }

        })

        return {
            isContentDisplayed
        }

    }
}
</script>

<style lang="scss">
@keyframes chevronUpsideDown {
    from {
        transform: rotate(180deg);
    }
    to {
        transform: rotate(0deg);
    }
}

@keyframes chevronNormalPosition {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(180deg);

    }
}

.chevronUpsideDown {
    animation: chevronUpsideDown 300ms both ease-in-out;
}

.chevronNormalPosition {
    animation: chevronNormalPosition 300ms both ease-in-out;
}

.dropdownElement {
    background-color: inherit;
    margin-top: 2rem;
    &__headerContainer {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    &__displayToggleBtn {
        border: 1px solid black;
        border-radius: 3px;
        background-color: inherit;
        margin-bottom: 0.5rem;
    }
    &__summaryContainer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: left;
        padding-bottom: calc(max(1rem, 1vw));
        div {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        &:hover {
            cursor: pointer;
        }
        h3 {
            margin: 0;
            margin-left: 0.5rem;
        }
        &--colored {
            background-color: red;
        }
    }
    &__chevronLogo {
        /*margin-right: 0.5rem;
        border: 2px solid black;
        border-radius: 5px;
        padding: 0.3rem;*/
    }
    &__feedContainer {
        overflow: auto;
        height: 400px;
        &--opening {
            animation: twitterFeedOpening 300ms both ease-in-out;
            transform-origin: top;
        }
        &--closing {
            animation: twitterFeedClosing 300ms both ease-in-out;
            transform-origin: top;
        }
        &::-webkit-scrollbar {
            width: 5px;
        }
        &::-webkit-scrollbar-track {
            background: #f1f1f1;
        }
        &::-webkit-scrollbar-thumb {
            background: #888;
        }
        &::-webkit-scrollbar-thumb:hover {
            background: #555;
        }
    }
}
</style>