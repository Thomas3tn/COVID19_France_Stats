# COVID-19 International and French Stats

This COVID-19 International and French Stats gathers datas from two API and uses the received datas to display the current COVID-19 situation from a single french departement to a worldwide scale both from a live and historic perspective.

![localhost_8080_ (13)](https://user-images.githubusercontent.com/58400913/130482286-51f3a672-12c3-49bc-9fa5-e124983ea0f5.png)


## APIs

-M-Media-Group Covid-19-API:

https://github.com/M-Media-Group/Covid-19-API

This API is used to display worldwide datas, country datas and sometimes regions datas when it concerns a relatively big country. It provides live datas like confirmed cases, deaths and recovered datas as well as vaccination datas (administred shots, first and second shots), but also historic datas from the outbreak of the pandemic until nowdays.

-CoronavirusAPI-France:

https://github.com/florianzemma/CoronavirusAPI-France

This API is essentially used as a complementary source for France ((daily) hospitalizations, (daily) intensive care) and is the primary source when it comes to display departement COVID datas.

Edit: Since august 12th 2021, this API return an empty response. Therefore the datas about France and its departements stop at that same date.

-Rest Countries:

https://restcountries.eu/

The Rest Countries API comes into picture when the app needs further informations about the requested location as the french location name, the GINI index, the demonym, the regional blocs where the requested country belongs to but also the country language, currency and location (latitude and longitude).

-Twitter API:

https://developer.twitter.com/en/docs/twitter-api

The Twitter API allows us to bring and show live news about the requested country of from a worldwide scale if the same location is a relatively small country and/or is not affected by the COVID-19. 

## Libraries

-Chartjs:

https://www.chartjs.org/

Chartjs is an invaluable tool when it comes to display datas in the most meaningful way. Therefore it is exclusively used in the dashboard to display historic datas (line chart) and vaccination datas (doughnut chart) of the requested location.

![t](https://user-images.githubusercontent.com/58400913/130483511-32cd67ef-ad71-40b9-bffa-6507791e0640.png)


## Technologies

-HTML

-CSS

-Javascript

-Vue

This entire project is build with Vue, which is an extremely indispensable tool when it comes to build interactive and maintainables interfaces like the dashboard.

-SVG

SVG is notably used to display interactive maps, either to select a country without using a form or to display datas from a regional perspective.

## Author

-Thomas3tn
