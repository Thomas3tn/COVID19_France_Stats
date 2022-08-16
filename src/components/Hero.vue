<template>
    <section class="hero">

            <div class="titles">
				<h2 class="titles__first">La pandémie de</h2>
                <h1 class="titles__second">COVID-19</h1>
                <h2 class="titles__third">Statistiques françaises et internationales</h2>
            </div>

            <router-link 
				:to="{path: '/', hash: '#search-section'}"
				title="Commencer votre recherche" 
				class="startLink"
			>
				<p>Commencer</p> 
				<font-awesome-icon 
					:icon="icon" 
					class="startLink__icon" 
					aria-hidden="true"
				/>
			</router-link>

        </section>
</template>

<script>
import { faLongArrowAltDown } from "@fortawesome/free-solid-svg-icons";
export default {
	setup() {
		
		return {
			icon: faLongArrowAltDown
		}

	}
}
</script>

<style lang="scss" scoped>
@keyframes appearance {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

@keyframes shakeUpAndDown {
	0% {
		transform: translateY(0%);
	}
	44% {
		transform: translateY(0%);
	}
	47% {
		transform: translateY(-10%);
	}
	50% {
		transform: translateY(0%);
	}
	53% {
		transform: translateY(10%);
	}
	56% {
		transform: translateY(0%);
	}
	100% {
		transform: translateY(0%);
	}
}
.hero {
	animation: appearance 800ms both ease-in-out;
	color: $white;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background: url("../assets/img/hero/heroBgMobile.jpg") no-repeat center;
	background-size: cover;
	background-attachment: fixed;
	@media (min-width: 1024px) {
		background: url("../assets/img/hero/heroBg.jpg") no-repeat center;
		background-size: cover;
		background-attachment: fixed;
	}
}
.titles {
	user-select: none;
	text-align: center;
	width: 90%;
	@media (min-width: 1024px) {
		width: auto;
		position: relative;
		top: 3%;
	}
	h2 {
		line-height: 175%;
	}
	&__first {
		letter-spacing: 0.2rem;
		font-size: clamp(1.2rem, 8vw, 3rem);
		margin: 0;
		text-transform: uppercase;
		@media (min-width: 768px) {
			margin-bottom: -1.2rem;
			font-size: 2rem;
		}
	}
	&__second {
		letter-spacing: 0.5rem;
		margin: 0;
		text-transform: uppercase;
		/*@media (min-width: 768px) {
			font-size: 7rem;
			letter-spacing: 0.8rem;
		}*/
	}
	&__third {
		letter-spacing: 0.1rem;
		margin-top: 2rem;
		font-size: 1.7rem;
		font-size: clamp(1.7rem, 2vw, 3rem);
		@media (min-width: 768px) {
			letter-spacing: 0.2rem;
		}
	}
}
.startLink {
	display: block;
	border: none;
	text-decoration: none;
	background-color: rgba(0, 0, 0, 0);
	color: $white;
	cursor: pointer;
	text-align: center;
	scroll-behavior: smooth;
	position: absolute;
	bottom: 7%;
	left: 50%;
	transform: translate(-50%, 50%);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	p {
		text-transform: uppercase;
		letter-spacing: 0.2rem;
		font-weight: bold;
	}
	&__icon {
		animation: shakeUpAndDown 4000ms both infinite ease-in-out;
		font-size: 2.5rem;
	}
}
</style>