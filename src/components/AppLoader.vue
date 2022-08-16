<template>

    <div class="appLoader">

        <div class="imgContainer">

            <img src="../assets/logo.png" class="img"/>

        </div>

    </div>

</template>

<style lang="scss" scoped>
@keyframes spinning {
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
.appLoader {
    background-color: $primary;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.imgContainer {
    width: calc(min(80px, 5%));
}
.img {
    width: 100%;
    height: auto;
    animation: spinning 3000ms ease-in-out;
    animation-iteration-count: infinite;
    background-color: #d9e4e4;
    padding: 0.5rem;
    border-radius: 10px;
}
</style>