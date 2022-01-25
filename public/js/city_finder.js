function findWeatherForecast(element) {
    $( ".suggestions" ).empty();
    let findForecastWebService = API_DOMAIN +'/forecast/' + element ;
    $.ajax({
        url : findForecastWebService,
        data : {
            'cityName' : element,
        },
        type : 'GET',
        dataType : 'json',
        success: function (data) {
            console.log(data);
            data.forEach(element => $( ".forecast_days" ).append('<ul><li>Date: '+element.date+'</li>',
                '<li>Minimum temperature: '+element.minTemperature+'</li>',
                '<li>Maximum temperature: '+element.maxTemperature+'</li>',
                '<li>Status: '+element.conditionText+'</li>',
                '<li><img src="'+element.conditionIcon+'"></li></ul>'));
        },
        error: function (data) {
            console.log('No se han encontrado datos para la ciudad: '+ city_name);
        },
    })
}
function checkCityNameEvent(city_name) {

    let findCityWebService = API_DOMAIN +'/suggested_cities/' + city_name ;
    $.ajax({

        url : findCityWebService,
        data : {
            'cityName' : city_name,
        },
        type : 'GET',
        dataType : 'json',
        success: function (data) {
            $( ".forecast_days" ).empty();
            $(".suggestions").empty();
            data.forEach(element =>
               $( ".suggestions" ).append('<li class="suggested_city"><a class="showForecast" id="'+element+'" href="#">'+element+'</a></li>')
           );
           $(".showForecast").click(function() {
               let name = $(this).attr('id');
               findWeatherForecast(name);
           })
        },
        error: function (data) {
            console.log('No se han encontrado resultados')
        },
    })
}

function findCityEvent() {
    $('#city_finder').keyup(function() {
        $( ".forecast_days" ).empty();
        $(".suggestions").empty();
        let city_name = $(this).val();
        checkCityNameEvent(city_name);
    });
}
$(document).ready(function() {
    findCityEvent();
});
