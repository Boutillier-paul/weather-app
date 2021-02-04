$(document).ready(function(){

    let api_key = 'b664b142db6566b9fc9503906ed7a763';

    $('#search').click(function(){

        let location = $('#location').val();
        $('#7Days-ul').empty();

        $.ajax({

            url : 'https://api.openweathermap.org/data/2.5/weather?q='+location+'&appid='+api_key+'&units=metric&lang=fr',
            type : 'GET',
            dataType : 'json',

            success : function(data){
                let value = data;   //get json file informations and put it into var

                let name = location.charAt(0).toUpperCase() + location.slice(1)
                let temp_moy = Math.round(value.main.temp);
                let temp_feel = Math.round(value.main.feels_like);
                let temp_min = Math.round(value.main.temp_min);
                let temp_max = Math.round(value.main.temp_max);
                let weather = value.weather[0].main;
                let weather_description = value.weather[0].description;
                    weather_description = weather_description.charAt(0).toUpperCase() + weather_description.slice(1);
                let latitude = value.coord.lat;
                let longitude = value.coord.lon;
                let currentDaTe = getCurrentDate();

                $('#weatherSection').html('<div class="row"><div class="col-lg-6"><div id="currentDay"><h1 id="name">'+name+'</h1><p id="day">'+currentDaTe+'</p><div id="currentDayInfo"><h2 class="currentDayInfos">'+temp_moy+' °C</h2><div class="currentDayInfos" id="weatherIcon"><img src="./assets/'+weather+'.svg"/></div></div></div></div><div class="col-lg-6"><ul><li><div class="card"><div class="card-header"><h4>Ressenti</h4></div><div class="card-body"><h4>'+temp_feel+' °C</h4></div></div></li><li><div class="card"><div class="card-header"><h4>Min</h4></div><div class="card-body"><h4>'+temp_min+' °C</h4></div></div></li><li><div class="card"><div class="card-header"><h4>Max</h4></div><div class="card-body"><h4>'+temp_max+' °C</h4></div></div></li></ul><p id="description">'+weather_description+'</p></div></div>');
                
                sevenDays(latitude, longitude);
            },
            error : function(){
                alert("La ville saisie n'existe pas !");
            }
        });
        
    });

    function sevenDays(latitude, longitude){
        $.ajax({

            url : 'https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&appid='+api_key+'&units=metric',
            type : 'GET',
            dataType : 'json',

            success : function(data){
                let value = data;

                let arrayOfDays = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
                let currentDate = new Date();
                let nbCurrentDay = currentDate.getDay();
                let nbDay = nbCurrentDay+1;

                //Display the weather for the seven next days (for loop)
                for(i=0; i<7; i++){
                    let weather = value.daily[i].weather[0].main;
                    let temp_moy = Math.round(value.daily[i].temp.day);
                    if(nbDay > 6){
                        nbDay = 0;
                    }

                    let dayName = arrayOfDays[nbDay];

                    $('#7Days-ul').append('<li><div class="card"><div class="card-header"><h5>'+dayName+'</h5></div><div class="card-body"><h5>'+temp_moy+' °C </h5><img src="./assets/'+weather+'.svg"/></div></div></li>');

                    nbDay+=1;
                }

            },
            error : function(){
                alert("Erreur de chargement !");
            }
        });
    }

    function getCurrentDate(){

        let arrayOfDays = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
        let arrayOfMonths = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
        
        let currentDate = new Date();
        let nbWeekday = currentDate.getDay();
        let numberDay = currentDate.getDate();
        let nbMonth = currentDate.getMonth();

        let currentDayIntoString = arrayOfDays[nbWeekday]+" "+numberDay+" "+arrayOfMonths[nbMonth];

        return currentDayIntoString;
    }
});