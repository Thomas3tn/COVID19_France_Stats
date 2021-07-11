<template>
    <div class="appLoader__container">
        <div class="appLoader">
            <img src="../assets/logo.png" class="appLoader__img"/>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss">
@keyframes appLoader {
    12% {
        transform: rotateX(0deg) rotateY(0deg);
    }
    25% {
        transform: rotateX(180deg) rotateY(0deg);
    }
    37% {
        transform: rotateX(180deg) rotateY(0deg);
    }
    51% {
        transform: rotateX(180deg) rotateY(180deg);
    }
    62% {
        transform: rotateX(180deg) rotateY(180deg);
    }
    75% {
        transform: rotateX(360deg) rotateY(180deg);
    }
    87% {
        transform: rotateX(360deg) rotateY(180deg);
    }
    100% {
        transform: rotateX(360deg) rotateY(360deg);
    }
}

.appLoader__container {
    background-color: #fbfcfd;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.appLoader {
    width: 5%;
    &__img {
        width: 100%;
        height: auto;
        animation: appLoader 3000ms ease-in-out;
        animation-iteration-count: infinite;
        background-color: #d9e4e4;
        padding: 0.5rem;
        border-radius: 10px;
    }
}
</style>