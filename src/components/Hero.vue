<template>
    <section class="hero">

            <div class="hero__titlesContainer">
				<h2 class="hero__firstTitle">La pandémie de</h2>
                <h1 class="hero__secondTitle">COVID-19</h1>
                <h2 class="hero__thirdTitle">Statistiques françaises et internationales</h2>
            </div>

            <a title="Commencer votre recherche" href="#searchResults" class="hero__seeMore">
				<div class="hero__seeMoreContentContainer">
					<p>Commencer</p> <i class="fas fa-long-arrow-alt-down hero__seeMoreArrow"></i>
				</div>
			</a>

        </section>
</template>

<style lang="scss">
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
	25% {
		transform: translateY(-10%);
	}
	50% {
		transform: translateY(0%);
	}
	75% {
		transform: translateY(10%);
	}
	100% {
		transform: translateY(0%);
	}
}

.hero {
	animation: appearance 800ms both ease-in-out;
	color: white;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background: url("../assets/img/heroBg.jpg")
		no-repeat center;
	background-size: cover;
	background-attachment: fixed;
	&__titlesContainer {
		text-align: center;
		position: relative;
		bottom: 0%;
		text-transform: uppercase;
		h2 {
			margin: 0;
		}
	}
	&__firstTitle {
		letter-spacing: 0.2rem;
	}
	&__secondTitle {
		font-size: 7rem;
		letter-spacing: 0.5rem;
		margin: 0;
	}
	&__thirdTitle {
		letter-spacing: 0.1rem;
	}
	&__seeMore {
		display: block;
		border: none;
		text-decoration: none;
		background-color: rgba(0, 0, 0, 0);
		color: white;
		cursor: pointer;
		text-align: center;
		scroll-behavior: smooth;
		position: absolute;
		bottom: 7%;
		left: 50%;
		transform: translate(-50%, 50%);
		&__seeMoreContentContainer {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			p {
				font-size: 2.5rem;
			}
		}
	}
	&__seeMoreArrow {
		animation: shakeUpAndDown 750ms both infinite;
		font-size: 2.5rem;
	}
}
</style>