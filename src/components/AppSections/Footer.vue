<template>
    <footer class="footer">

        <div class="footer__topPageBtnContainer">
            <button class="footer__topPageBtn" @click="backToTopPage" title="Haut de Page">Haut de Page</button>
        </div>
        <div class="footer__infosContainer">
            <div class="aboutContainer">
                <h2>À propos</h2>
                <p>Cette application vise à apporter un aperçu sur la crise sanitaire sans précédents que nous traversons actuellement. Ainsi cette application vise avant tout à rassembler et résumer les données existantes et ne peut être tenue responsable pour les erreurs de données qui peuvent existées.</p>
            </div>

            <div class="quickLinksContainer">
                <h2>Liens rapides</h2>
                <ul>
                    <li><a href="#" title="Politique de sauvegarde des données">Politique de sauvegarde des données</a></li>
                    <li><a href="https://github.com/Thomas3tn/COVID19_France_Stats" title="Code Source">Code source</a></li>
                    <li><a href="https://github.com/M-Media-Group/Covid-19-API" title="Données internationales">Données internationales</a></li>
                    <li><a href="https://github.com/florianzemma/CoronavirusAPI-France" title="Données françaises">Données françaises</a></li>
                </ul>
            </div>
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
        font-size: 1.2rem;
		width: 100%;
		height: 100%;
		background-color: rgb(30, 30, 30);
		color: white;
		border: none;
		cursor: pointer;
		padding: 0.5rem 0;
		transition: all 300ms;
		&:hover {
			background-color: lighten(rgb(30, 30, 30), 7%);
		}
	}
	&__infosContainer {
		display: flex;
        flex-direction: column;
		justify-content: space-around;
		align-items: flex-start;
		background-color: rgb(30, 30, 30);
		color: white;
		padding: 1rem 4rem;
        @media (min-width: 1024px) {
            flex-direction: row;
        }
	}
}

.aboutContainer {
    flex: 3;
    text-align: justify;
}

.quickLinksContainer {
    flex: 1;
    a {
        color: white;
        text-decoration: none;
        &:visited {
            color: white;
        }
    }
}
</style>