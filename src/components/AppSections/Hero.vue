<template>
    <section class="hero">

            <div class="hero__title">
                <h1>COVID-19</h1>
                <h2>France statistiques</h2>
            </div>

            <div class="hero__seeMore">
                <p>Commencer votre recherche</p>
                <a title="Start your search" href="#searchResults"><i class="fas fa-long-arrow-alt-down"></i></a>
            </div>

        </section>
</template>

<style lang="scss">
.hero {
	color: white;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background: url("https://images.pexels.com/photos/3970329/pexels-photo-3970329.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
		no-repeat center;
	background-size: cover;
	background-attachment: fixed;
	&__title {
		text-align: center;
		h1 {
			font-size: 7rem;
			letter-spacing: 0.5rem;
			margin: 0;
		}
		p {
			margin: 0;
			font-size: 4rem;
		}
	}
	&__seeMore {
		display: flex;
		flex-direction: column;
		position: absolute;
		bottom: 10%;
		left: 50%;
		transform: translate(-50%, 50%);
		p {
			font-size: 1.5rem;
		}
		a {
			border: none;
			background-color: rgba(0, 0, 0, 0);
			color: white;
			font-size: 3rem;
			cursor: pointer;
			text-align: center;
			scroll-behavior: smooth;
		}
	}
}
</style>