# Event Two Weather Forecast Test
## Especificación funcional
Se trata de desarrollar una página web en la que se pueda consultar la predicción del tiempo de una localidad.
Se puede realizar con cualquier framework, preferiblemente en PHP pero puede ser otro lenguaje.

En la página, inicialmente se muestra un campo de texto en el que se introducirá el nombre de la localidad, y que realizará un autocompletado de las posibles localidades de las que se puede obtener la predicción.
Una vez seleccionada una localidad en el autocompletado, se mostrará por Ajax la predicción de los próximos días según los datos obtenidos (icono de sol/lluvia/…, temperaturas, precipitación, …)

Las localidades y las predicciones se han de obtener de una API externa. En https://www.weatherapi.com se puede conseguir una API key gratuita para hacer peticiones, pero se puede usar otra si se cree conveniente.

La interacción con la API ha de ser obligatoriamente desde servidor, no se pueden obtener los datos con javascript en cliente.

La documentación de la API se encuentra en https://www.weatherapi.com/docs/ y hay una herramienta para poder probarla en la web, https://www.weatherapi.com/api-explorer.aspx 

Idealmente la prueba se hará en 3 horas como máximo, priorizándose el código de backend sobre el frontend.

La prueba se puede subir a GitHub o enviarse por mail en un zip, junto con instrucciones de cómo ejecutarla.

## Instalación del proyecto
1. clonar el archivo con el comando git clone https://github.com/Lospitao/EventTwoWeatherForecastTest.git en la carpeta local deseada
2. ejecutar composer install para instalar la librería de www.theweatherapi.com
3. inicializar el servidor de symfony con el comando symfony server:start y cambiar el parámetro 'API_HOST' en el archivo .env de acuerdo con el localhost que estemos utilizando. 
## Instrucciones
La ruta del índice de la página es /forecast_index.
1. En el input "city" introduciremos al menos tres letras del nombre de la ciudad cuya predicción meteorológica queremos encontrar, lo que nos arrojará una serie
de sugerencias
2. Al pinchar en cualquiera de las sugerencias, se nos devolverá la predicción de los próximos tres días (fecha, temperatura máxima, temperatura mínima, estado 
del tiempo e icono que lo representa)
## Estructura del desarrollo
La prueba requería la utilización de una arquitectura cliente-servidor. 
Toda la ejecución del flujo se realiza en una sola vista. Cuando el usuario teclea al menos tres letras en el campo "city", un evento onkeyup 
1. Vacía los elementos del DOM donde se añaden los resultados de la búsqueda
2. Realiza una llamada ajax al servicio /suggested_cities/{cityName} que: 
1. Vacía los elementos del DOM donde se añaden los elementos de la búsqueda
2. Devuelve un array de nombres de ciudades sugeridos por la api theweatherapi. 
3. Añade al DOM un elemento anchor por cada uno de los elementos del array devuelto por el servicio
4. Vincula a cada uno de esos elementos anchor un evento onclick
Cada vez que un usuario pincha en uno de los nombres de ciudad sugeridos:
1. Vacía los elementos del DOM donde se añaden los elementos de la búsqueda
2. Se ejecuta una llamada ajax al servicio /forecast/{cityName}, y este devuelve un array de
tres objetos (uno por día) que incluyen los parámetros de la predicción devueltos por el servicio
3. Se añade al DOM un unordered list con los elementos devueltos por el servicio.
## Construido con
* php 7.4.3
* symfony 4.28
* composer 2.2.5
* weatherapi-PHP SDK
symfony
## Observaciones
Por problemas con la configuración de CORS que no se han logrado solventar a tiempo, se ha optado por incluir los servicios de la api en la ruta Controller/api/v1
Idealmente, se crearían dos proyectos de symfony, uno completo y uno tipo api. Para vincular el cliente a la api se utilizaría el parámetro API_HOST definido en el
archivo .env y pasado como parámetro en el archivo services.yaml y se pasaría a la vista mediante parámetro en el render del controlador de la vista "'apiHost' => $this->getParameter('api_host')"

