<template>
    <div class="dashboardSkeleton">
        <div class="dashboardSkeletonPanel asidePanel">
            <div class="asidePanel__locationHeader">
                <div class="asidePanel__flag"><!--Flag--></div>
                <div class="asidePanel__locationName"><!--Location Name--></div>
            </div>
            <div class="asidePanel__locationMap"><!--Map--></div>
            <div class="asidePanel__overviewHeader">
                <div class="asidePanel__subHeaderLogo"></div>
                <div class="asidePanel__subHeader"></div>
            </div>
            <ul class="asidePanel__list">
                <li class="asidePanel__listItem"></li>
                <li class="asidePanel__listItem"></li>
                <li class="asidePanel__listItem"></li>
                <li class="asidePanel__listItem"></li>
            </ul>
            <ul class="asidePanel__list">
                <li class="asidePanel__listItem"></li>
                <li class="asidePanel__listItem"></li>
                <li class="asidePanel__listItem"></li>
                <li class="asidePanel__listItem"></li>
            </ul>
            <ul class="asidePanel__list">
                <li class="asidePanel__listItem"></li>
            </ul>
        </div>
        <div class="dashboardSkeleton__diseaseDatasPanel">
            <div class="dashboardSkeletonPanel dashboardSkeletonPanel--currentSituationPanel">
                <div class="dashboardSkeletonPanel__headerContainer">
                    <div class="dashboardSkeletonPanel__header"></div>
                </div>
                <div class="dashboardSkeletonPanel__contentContainer">
                    <stat-item-placeholder></stat-item-placeholder>
                    <stat-item-placeholder></stat-item-placeholder>
                    <stat-item-placeholder></stat-item-placeholder>
                </div>
            </div>
            <div class="dashboardSkeleton__vaccRelDatasPanels">
                <div class="dashboardSkeletonPanel dashboardSkeletonPanel--vaccinationDatasPanel">
                    <div class="dashboardSkeletonPanel__headerContainer">
                        <div class="dashboardSkeletonPanel__header"></div>
                    </div>
                    <div class="dashboardSkeletonPanel__contentContainer">
                        <div class="dashboardSkeletonPanel__vaccChartOuterCircle">
                            <div class="dashboardSkeletonPanel__vaccChartInnerCircle"></div>
                        </div>
                    </div>
                </div>
                <div class="dashboardSkeletonPanel dashboardSkeletonPanel--relativeDatasPanel">
                    <div class="dashboardSkeletonPanel__headerContainer">
                        <div class="dashboardSkeletonPanel__header"></div>
                    </div>
                    <div class="dashboardSkeletonPanel__contentContainer dashboardSkeletonPanel__contentContainer--vertical">
                        <stat-item-placeholder></stat-item-placeholder>
                        <stat-item-placeholder></stat-item-placeholder>
                    </div>
                </div>
            </div>
            <div class="dashboardSkeletonPanel dashboardSkeletonPanel--weeklyDailyDatasPanel">
                <div class="dashboardSkeletonPanel__headerContainer">
                    <div class="dashboardSkeletonPanel__header"></div>
                    <div class="dashboardSkeletonPanel__header"></div>
                </div>
                <div class="dashboardSkeletonPanel__contentContainer">
                    <stat-item-placeholder></stat-item-placeholder>
                    <stat-item-placeholder></stat-item-placeholder>
                    <stat-item-placeholder></stat-item-placeholder>
                </div>
            </div>
            <div class="dashboardSkeletonPanel dashboardSkeletonPanel--locationEvolutionDatas">
                <div class="dashboardSkeletonPanel__headerContainer">
                    <div class="dashboardSkeletonPanel__header"></div>
                </div>
                <div class="dashboardSkeletonPanel__contentContainer dashboardSkeletonPanel__contentContainer--vertical">
                    <div class="locationEvolutionForm">
                        <div class="locationEvolutionForm__datatypeSelect"></div>
                        <div class="locationEvolutionForm__checkboxesContainer">
                            <div class="locationEvolutionForm__checkbox"></div>
                            <div class="locationEvolutionForm__checkbox"></div>
                            <div class="locationEvolutionForm__checkbox"></div>
                        </div>
                    </div>
                    <div class="dashboardSkeletonPanel__locationEvolutionChart"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import StatItemPlaceholder from "./DashboardSkeletonAnimation/StatItemPlaceholder.vue";

export default {
    components: {
        StatItemPlaceholder
    }
}
</script>

<style lang="scss">
@keyframes dashboardSkeletonAppearance {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes aniHorizontal {
    0% {
        background-position: -100% 0;
    }

    100% {
        background-position: 100% 0;
    }
}

@mixin slidingElementAnimation {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    animation-name: aniHorizontal;
    animation-duration: 3.5s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    background: linear-gradient(
        to right,
        #cccccc 2%,
        #666666 18%,
        #cccccc 33%
    );
    background-size: 50%;
    mix-blend-mode: overlay;
}

.dashboardSkeleton {
    animation: dashboardSkeletonAppearance 400ms ease-in-out;
    opacity: 1;
    transition: opacity 300ms;
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    @media (min-width: 1024px) {
        flex-direction: row;
    }
    &__diseaseDatasPanel {
        flex: 3;
    }
    &__vaccRelDatasPanels {
        display: flex;
        justify-content: space-between;
        align-items: stretch;
        flex-direction: column;
        @media (min-width: 1024px) {
            min-height: clamp(23rem, 33vw, 45rem);
            flex-direction: row;
            > div {
            flex: 1;
            margin: 0;
            }
            > div:first-child {
                margin-right: 1.5vw;
            }
            > div:last-child {
                margin-left: 1.5vw;
            }
        }
    }
}

.dashboardSkeletonPanel {
    background-color: rgb(253, 253, 253);
    margin: 3vw 0;
    padding: 1rem;
    color: #303030;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    &--currentSituationPanel {
        min-height: 182px;
    }
    &--vaccinationDatasPanel {
        min-height: 428px;
    }
    &--relativeDatasPanel {
        min-height: 428px;
    }
    &--weeklyDailyDatasPanel {
        min-height: 172px;
    }
    &--locationEvolutionDatas {
        min-height: 503px;
    }
    > div {
        &:first-child {
            margin-top: 0;
        }
        &:last-child {
            margin-bottom: 0;
        }
    }
    &__headerContainer {
        border-bottom: 1px solid lightgray;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    &__header {
        height: 2.5rem;
        background-color: lightgray;
        width: 30%;
        margin-bottom: 0.5rem;
        position: relative;
        &:before {
            @include slidingElementAnimation;
        }
    }
    &__contentContainer {
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex: 1;
        height: auto;
        flex-direction: column;
        @media (min-width: 1024px) {
            flex-direction: row;
        }
        &--vertical {
            justify-content: center;
            flex-direction: column;
        }
    }
    &__vaccChartOuterCircle {
        margin-top: 1.5rem;
        width: 70vw;
        height: 70vw;
        border-radius: 50%;
        background-color: lightgray;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        @media (min-width: 1024px) {
            width: 15vw;
            height: 15vw;
        }
        &:before {
            @include slidingElementAnimation;
        }
    }
    &__vaccChartInnerCircle {
        background-color: white;
        width: 35vw;
        height: 35vw;
        border-radius: 50%;
        @media (min-width: 1024px) {
            width: 7vw;
            height: 7vw;
        }
    }
    &__locationEvolutionChart {
        flex: 2;
        background-color: lightgray;
        width: 100%;
        min-height: 300px;
        position: relative;
        margin-top: 2rem;
        &:before {
            @include slidingElementAnimation;
        }
    }
}

.locationEvolutionForm {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50%;
    width: 100%;
    margin-top: 2rem;
    @media (min-width: 1024px) {
        margin-top: 0;
    }
    &__datatypeSelect {
        background-color: lightgray;
        width: 75%;
        height: 1.3rem;
        position: relative;
        &:before {
            @include slidingElementAnimation;
        }
    }
    &__checkboxesContainer {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 75%;
        height: 1.3rem;
    }
    &__checkbox {
        height: 100%;
        background-color: lightgray;
        margin-right: 2vw;
        width: 2vw;
        height: 2vw;
        position: relative;
        &:before {
            @include slidingElementAnimation;
        }
    }
    &__checkboxInput {
        background-color: lightgray;
        height: 100%;
        margin-right: 2rem;
        width: 13%;
        position: relative;
    }
    &__checkboxLabel {
        background-color: lightgray;
        height: 100%;
        width: 75%;
        position: relative;
        &:before {
            @include slidingElementAnimation;
        }
    }
}

.asidePanel {
    height: 1255px;
    flex: 1;
    @media (min-width: 1024px) {
        position: sticky;
        top: 0;
        margin-right: 3vw;
    }
    &__locationHeader {
        display: flex;
        justify-content: space-between;
        height: 3rem;
        margin: 1rem 0;
    }
    &__flag {
        width: 20%;
        background-color: lightgray;
        position: relative;
        &:before {
            @include slidingElementAnimation;
        }
    }
    &__locationName {
        width: 50%;
        background-color: lightgray;
        position: relative;
        &:before {
            @include slidingElementAnimation;
        }
    }
    &__locationMap {
        height: 25%;
        background-color: lightgray;
        position: relative;
        &:before {
            @include slidingElementAnimation;
        }
    }
    &__overviewHeader {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 2rem;
        margin: 1.5rem 0 0.5rem 0;
    }
    &__subHeaderLogo {
        background-color: lightgray;
        height: 100%;
        position: relative;
        width: 15%;
        margin-right: 2rem;
        &:before {
            @include slidingElementAnimation;
        }
    }
    &__subHeader {
        background-color: lightgray;
        height: 100%;
        position: relative;
        width: 50%;
        &:before {
            @include slidingElementAnimation;
        }
    }
    &__list {
        border-top: 1px solid lightgray;
        padding-top: 0.5rem;
    }
    &__listItem {
        font-size: 1rem;
        width: 40%;
        background-color: lightgray;
        margin-bottom: 0.5rem;
        position: relative;
        &:before {
            @include slidingElementAnimation;
        }
    }
}
</style>