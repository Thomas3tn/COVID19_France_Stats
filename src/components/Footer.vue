<template>
    <footer class="footer">

        <div class="footer__topPageBtnContainer">
            <button class="footer__topPageBtn" @click="backToTopPage" title="Haut de Page">Haut de Page</button>
        </div>
        <div class="footer__infosContainer">
            <div class="aboutContainer">
                <h2 class="footer__headers">À propos</h2>
                <p>Cette application vise à apporter un aperçu sur la crise sanitaire sans précédents que nous traversons actuellement. Ainsi cette application vise avant tout à rassembler et résumer les données existantes et ne peut être tenue responsable pour les erreurs de données qui peuvent existées.</p>
            </div>

            <nav class="quickLinksContainer" aria-label="Menu de navigation secondaire (liens externe et politique de sauvegarde des données)">
                <h2 class="footer__headers">Liens rapides</h2>
                <ul>
                    <li><router-link :to="{name: 'Datas Save Agreement'}" title="Politique de sauvegarde des données" role="link">Politique de sauvegarde des données</router-link></li>
                    <li><a href="https://github.com/Thomas3tn/COVID19_France_Stats" title="Code Source" target="_blank">Code source</a></li>
                    <li><a href="https://github.com/M-Media-Group/Covid-19-API" title="Données internationales" target="_blank">Données internationales</a></li>
                    <li><a href="https://github.com/florianzemma/CoronavirusAPI-France" title="Données françaises" target="_blank">Données françaises</a></li>
                </ul>
            </nav>
        </div>

    </footer>
</template>

<script>
export default {
    setup() {

        function backToTopPage() {

            document.body.scrollTop = 0; //For Safari
            document.documentElement.scrollTop = 0; //For Chrome, Firefox, IE

        }

        return {
            backToTopPage
        }

    }
}
</script>

<style lang="scss">
.footer {
	&__topPageBtn {
		width: 100%;
		height: 100%;
        background-color: #334455;
		color: white;
		border: none;
		cursor: pointer;
		padding: 0.75rem 0;
		transition: all 350ms ease-out;
        position: relative;
        &:after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 50%;
            height: 1px;
            background-color: #e6f0f0;
            width: 5%;
            min-width: 4rem;
            transform: translateX(-50%);
            transition: all 350ms ease-out;
        }
		&:hover {
			background-color: lighten(#334455, 7%);
            &:after {
                width: 100%;
            }
		}
	}
	&__infosContainer {
		display: flex;
        flex-direction: column;
		justify-content: space-around;
		align-items: center;
        background-color: #334455;
		color: white;
		padding: 1rem 4%;
        @media (min-width: 1024px) {
            flex-direction: row;
        }
	}
    &__headers {
        font-size: clamp(1.5rem, 2vw, 2.7rem);
        text-align: center;
        @media (min-width: 1024px) {
            text-align: left;
        }
    }
}

.aboutContainer {
    flex: 3;
    text-align: justify;
    @media (min-width: 1024px) {
        margin-right: 3rem;
        padding-right: 3rem;
        border-right: 1px solid #e6f0f0;
    }
    @media (min-width: 1120px) {
        flex: 4;
    }
    @media (min-width: 1260px) {
        flex: 5;
    }
}

.quickLinksContainer {
    flex: 2;
    ul {
        list-style-type: square;
    }
    li {
        margin-bottom: 0.3rem;
        position: relative;
        right: 4%;
    }
    a {
        color: white;
        text-decoration: none;
        position: relative;
        &:before {
            content: "";
            position: absolute;
            width: 0;
            height: 1px;
            bottom: 0;
            left: 0;
            background-color: white;
            visibility: hidden;
            transition: all 0.3s ease-in-out;
        }
        &:hover::before {
            visibility: visible;
            width: 100%;
        }
        &:visited {
            color: white;
        }
    }
}
</style>