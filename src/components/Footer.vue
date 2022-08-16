<template>
    <footer class="footer">

        <div>
            <button 
                class="topPageBtn" 
                @click="backToTopPage" 
                title="Haut de Page"
            >
                Haut de Page
            </button>
        </div>

        <div class="infosContainer">

            <div class="aboutContainer">
                <h2 class="header">À propos</h2>
                <p>Cette application vise à apporter un aperçu sur la crise sanitaire sans précédents que nous traversons actuellement. Ainsi cette application vise avant tout à rassembler et résumer les données existantes et ne peut être tenue responsable pour les erreurs de données qui peuvent existées.</p>
            </div>

            <nav class="quickLinksContainer" aria-label="Menu de navigation secondaire (liens externe et politique de sauvegarde des données)">
                <h2 class="header">Liens rapides</h2>
                <ul>
                    <li>
                        <router-link 
                            :to="{name: 'Datas Backup'}" 
                            title="Politique de sauvegarde des données" 
                            role="link"
                        >
                            Politique de sauvegarde des données
                        </router-link>
                    </li>
                    <li v-for="LINK in LINKS" :key="LINK">
                        <a 
                            :href="LINK.HREF" 
                            :title="LINK.TITLE" 
                            target="_blank"
                        >
                            {{ LINK.TITLE }}
                        </a>
                    </li>
                </ul>
            </nav>

        </div>

    </footer>
</template>

<script>
export default {
    setup() {

        return {
            LINKS: [
                {
                    TITLE: "Code source",
                    HREF: "https://github.com/Thomas3tn/COVID19_France_Stats",
                },
                {
                    TITLE: "Données internationales",
                    HREF: "https://github.com/M-Media-Group/Covid-19-API"
                },
                {
                    TITLE: "Données françaises",
                    HREF: "https://github.com/florianzemma/CoronavirusAPI-France"
                }
            ],
            backToTopPage: () => {

                document.body.scrollTop = 0; //For Safari
                document.documentElement.scrollTop = 0; //For Chrome, Firefox, IE

            }
        }

    }
}
</script>

<style lang="scss" scoped>
.footer {
    background-color: $secondary-dark
}
.header {
    font-size: clamp(1.5rem, 2vw, 2.7rem);
    text-align: center;
    @media (min-width: 1024px) {
        text-align: left;
    }
}
.topPageBtn {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
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
        background-color: $secondary-light;
        width: 5%;
        min-width: 4rem;
        transform: translateX(-50%);
        transition: all 350ms ease-out;
    }
    &:hover {
        background-color: lighten($secondary-dark, 7%);
        &:after {
            width: 100%;
        }
    }
}
.infosContainer {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    color: white;
    padding: 1rem 4%;
    @media (min-width: 1024px) {
        flex-direction: row;
    }
}
.aboutContainer {
    flex: 3;
    text-align: justify;
    @media (min-width: 1024px) {
        margin-right: 3rem;
        padding-right: 3rem;
        border-right: 1px solid $secondary-light;
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