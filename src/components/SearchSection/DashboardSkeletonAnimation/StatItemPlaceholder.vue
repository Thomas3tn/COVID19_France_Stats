<template>
    <div class="statItemPlaceholder">
		<div class="statItemPlaceholder__logoPart"></div>
        <div class="statItemPlaceholder__statPart">
			<div class="statItemPlaceholder__number"></div>
            <div class="statItemPlaceholder__title"></div>
        </div>
    </div>
</template>

<style lang="scss">
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

.statItemPlaceholder {
    display: flex;
	justify-content: center;
	align-items: center;
    height: 4rem;
    width: 10rem;
	padding: 1.5rem 0 1.5rem 0;
    &__logoPart {
        flex: 1;
        font-size: 2.5rem;
		margin-right: 1rem;
        height: 75%;
        background-color: lightgray;
        position: relative;
        &:before {
            @include slidingElementAnimation;
        }
    }
    &__statPart {
        flex: 2;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
    &__number {
		margin-bottom: 0.5rem;
		height: 2.3rem;
        background-color: lightgray;
        width: 100%;
        position: relative;
        &:before {
            @include slidingElementAnimation;
        }
	}
	&__title {
		height: 0.8rem;
        background-color: lightgray;
        width: 100%;
        position: relative;
        &:before {
            @include slidingElementAnimation;
        }
	}
}
</style>