# COVID-19 International and French Stats

This COVID-19 International and French Stats gathers datas from two API and uses the received datas to display the current COVID-19 situation from a single french departement to a worldwide scale both from a live and historic perspective.

## APIs

-M-Media-Group Covid-19-API:

https://github.com/M-Media-Group/Covid-19-API

This API is used to display worldwide datas, country datas and sometimes regions datas and its concern a relatively big country. It provides live datas like confirmed cases, deaths and recovered datas as well as vaccination datas (administred shots, first and second shots), but also historic datas from the outbreak of the pandemic until nowdays.

-CoronavirusAPI-France:

https://github.com/florianzemma/CoronavirusAPI-France

This API is essentially used as a complementary source for France ((daily) hospitalizations, (daily) intensive care) and is the primary source when it comes to display departement COVID datas.

-Rest Countries:

https://restcountries.eu/

The Rest Countries API comes into picture when the app needs further informations about the requested location as the french location name, the GINI index, the demonym, the regional blocs where the requested country belongs but also the country language, currency and location (latitude and longitude).

-Twitter API:

https://developer.twitter.com/en/docs/twitter-api

The Twitter API allows us to bring and shown live news about from the requested country of from a worldwide scale if the same location is a relatively small country and/or is not affected by the COVID-19. 

## Libraries

-Chartjs:

https://www.chartjs.org/

Chartjs is an invaluable tool when it comes to display datas in the most meaningful way. Therefore it is exclusively used in the dashboard to display historic datas (line chart) and vaccination datas (doughnut chart) of the requested location.

## Technologies

-HTML
-CSS
-JS
-Vue
-SVG

## Author

-Thomas3tn
