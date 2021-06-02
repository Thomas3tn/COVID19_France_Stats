<template>
    <div>
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
                    <div class="dashboardSkeletonPanel__contentContainer">
                        <div class="dashboardSkeletonPanel__locationEvolutionChart"></div>
                        <div class="locationEvolutionForm">
                            <div class="locationEvolutionForm__datatypeSelect"></div>
                            <div class="locationEvolutionForm__checkboxContainer">
                                <div class="locationEvolutionForm__checkboxInput"></div>
                                <div class="locationEvolutionForm__checkboxLabel"></div>
                            </div>
                            <div class="locationEvolutionForm__checkboxContainer">
                                <div class="locationEvolutionForm__checkboxInput"></div>
                                <div class="locationEvolutionForm__checkboxLabel"></div>
                            </div>
                            <div class="locationEvolutionForm__checkboxContainer">
                                <div class="locationEvolutionForm__checkboxInput"></div>
                                <div class="locationEvolutionForm__checkboxLabel"></div>
                            </div>
                        </div>
                    </div>
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
    &__diseaseDatasPanel {
        flex: 2;
    }
    &__vaccRelDatasPanels {
        display: flex;
        justify-content: space-between;
        align-items: stretch;
        > div {
            flex: 1;
            &:first-child {
                margin-right: 2rem;
            }
        }
    }
}

.dashboardSkeletonPanel {
    background-color: rgb(253, 253, 253);
    margin: 2rem 0;
    padding: 1rem;
    color: #303030;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    &--currentSituationPanel {
        height: 182px;
    }
    &--vaccinationDatasPanel {
        height: 428px;
    }
    &--relativeDatasPanel {
        height: 428px;
    }
    &--weeklyDailyDatasPanel {
        height: 172px;
    }
    &--locationEvolutionDatas {
        height: 503px;
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
        &--vertical {
            justify-content: center;
            flex-direction: column;
        }
    }
    &__vaccChartOuterCircle {
        width: 15vw;
        height: 15vw;
        border-radius: 50%;
        background-color: lightgray;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        &:before {
            @include slidingElementAnimation;
        }
    }
    &__vaccChartInnerCircle {
        background-color: white;
        width: 7vw;
        height: 7vw;
        border-radius: 50%;
    }
    &__locationEvolutionChart {
        flex: 2;
        background-color: lightgray;
        width: 100%;
        height: 80%;
        position: relative;
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
    flex-direction: column;
    height: 50%;
    &__datatypeSelect {
        background-color: lightgray;
        width: 75%;
        height: 1.3rem;
        position: relative;
        &:before {
            @include slidingElementAnimation;
        }
    }
    &__checkboxContainer {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 75%;
        height: 1.3rem;
    }
    &__checkboxInput {
        background-color: lightgray;
        height: 100%;
        margin-right: 2rem;
        width: 13%;
        position: relative;
        &:before {
            @include slidingElementAnimation;
        }
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
    margin-right: 2rem;
    height: 1255px;
    position: sticky;
    top: 0;
    flex: 1;
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
        height: 1.5rem;
    }
    &__subHeaderLogo {
        background-color: lightgray;
        height: 100%;
    }
    &__subHeader {
        background-color: lightgray;
        height: 100%;
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