<template>
  <router-view/>
</template>

<style lang="scss">

//Global styles
html {
  scroll-behavior: smooth;
}

body {
  font-family: sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.4;
}

h1, h2, h3, h4, h5, h6 {
  font-family: "Open Sans", sans-serif;
}

p, button, input, a, li, label {
  font-family: "Roboto", sans-serif;
}

p, button, a, li, label, i, th, td {
  font-size: clamp(1rem, 1.1vw, 2.5rem);
}

h1 {
  font-size: clamp(3rem, 9vw, 13rem);
}

h2 {
  font-size: clamp(2rem, 3vw, 5rem);
}

h3 {
  font-size: clamp(1.8rem, 3vw, 5rem);
}

h4 {
  font-size: clamp(1rem, 1.4vw, 1.8rem);
}

.screenreaderText {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}

.btn {
  font-size: inherit;
  border-radius: 9px;
  text-decoration: none;
  text-align: center;
  padding: 1rem 2rem;
  border: 2px solid;
  margin: 0.5rem 0;
  transition: all 300ms;
  &:hover {
    cursor: pointer;
  }
  &--alert {
    background-color: rgba(0,0,0,0);
    transition: all 300ms;
    &:hover {
      background-color: #EB4647;
      border-color: #EB4647;
      color: $white;
    }
  }
  &--info {
    border-color: $secondary;
    background-color: $secondary;
    color: $white;
    text-decoration: none;
    transition: all 300ms;
    &:hover {
      background-color: darken($secondary, 10%);
      border-color: darken($secondary, 10%);
    }
  }
}
</style>