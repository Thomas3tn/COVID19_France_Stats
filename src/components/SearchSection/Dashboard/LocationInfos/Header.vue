<template>

    <header class="header">

        <img 
            v-if="logo.url !== false && isLogoURLWorking === true" 
            :src="logo.url" 
            :title="locationInfos.frName" 
            :alt="logo.alt" 
            @error="onLogoURLError"
        >
        <font-awesome-icon 
            v-else 
            :icon="logo.default" 
            class="defaultLogo"
        />
        <h2>{{ locationInfos.frName }}</h2>

    </header>

</template>

<script>
import { ref, computed, reactive, inject } from "vue";
import { useStore } from "vuex";

export default {
    props: {
        locationInfos: {
            type: Object,
            required: true
        },
        locationType: {
            type: String,
            required: true
        }
    },
    setup(props) {

        const store = useStore();
        const DASHBOARD_DATAS = computed(() => store.state.DashboardAssets);
        const LOC_TYPES = inject("LOCATION_TYPES");

        let isLogoURLWorking = ref(true);

        const LOGO =  {
            URLS: {
                [LOC_TYPES.COUNTRY]: `https://www.countryflagicons.com/FLAT/64/[ABBREVIATION].png`,
                [LOC_TYPES.DEPARTEMENT]: `https://www.regions-et-departements.fr/images/logos-departements/[ABBREVIATION]-logo-[FRNAME].png`,
            },
            ALTS: {
                [LOC_TYPES.COUNTRY]: `Drapeau du pays: [FRNAME]`,
                [LOC_TYPES.DEPARTEMENT]: `Logo du département: [FRNAME]`
            }
        }

        const logo = reactive({
            url: computed(() => {

                try {

                    let url = LOGO.URLS[props.locationType];
                    url = url.replace(/\[ABBREVIATION\]/, Number.isNaN(props.locationInfos.abbreviation) ? props.locationInfos.abbreviation.toUpperCase() : props.locationInfos.abbreviation);
                    url = url.replace(/\[FRNAME\]/, props.locationInfos.frName.toLowerCase());
                    return url;

                } catch {
                    return false;
                }

            }),
            alt: computed(() => {

                try {

                    let alt = LOGO.ALTS[props.locationType];
                    alt = alt.replace(/\[FRNAME\]/, props.locationInfos.frName);
                    return alt;

                } catch {
                    return false;
                }

            }),
            default: computed(() => {

                if ([LOC_TYPES.DEPARTEMENT, LOC_TYPES.COUNTRY].includes(props.locationType)) {
                    return DASHBOARD_DATAS.value.ICONS.LOCATION[props.locationType.toUpperCase()];
                } else if (props.locationType === LOC_TYPES.CONTINENT) {
                    return DASHBOARD_DATAS.value.ICONS.LOCATION[props.locationInfos.name.replace(/\s/, "_").toUpperCase()];
                } else {
                    return false;
                }

            })
        });

        const onLogoURLError = () => isLogoURLWorking.value = false;

        return {
            logo,
            isLogoURLWorking,
            onLogoURLError
        }

    },
}
</script>

<style lang="scss" scoped>
.header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.75rem;
    @media (min-width: 1024px) {
        justify-content: flex-start;
    }
    img {
        width: 20%;
    }
    h2 {
        margin: 0;
        margin-left: 5%;
        font-size: clamp(2rem, 1.7vw, 3rem);
    }
}
.defaultLogo {
    font-size: clamp(2rem, 2vw, 3rem);
}
</style>