var id = "b01a643eaa430a9415ba1b6fadc4e1cd";
var city = $('#city');
var weather = $('#weather');
var icon = $('#icon');
var humidity = $('#humidity');
var pressure = $('#pressure');
var temp = $('#temp');
var form = $('#form');
var changeTemp = $('#changeTemp');
getData();

form.submit(function(event) {
    event.preventDefault();
    getData();

});
changeTemp.click(function() {
    if (changeTemp.html() === 'F') {
        changeTemp.html('C');
        temp.html(ftoc(temp.html()));

    } else {
        changeTemp.html('F');
        temp.html(ctof(temp.html()));
    }
});

function getData() {
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?zip=" + $('#zip').val() + ',us&appid=' + id,
        success: function(data) {
            console.log(data);
            city.html(data.name + ", " + data.sys.country);
            weather.html(data.weather[0].description);
            icon.attr('src', setIcon(data.weather[0].id));
            humidity.html(data.main.humidity + '%');
            pressure.html(data.main.pressure);
            temp.html(ktof(data.main.temp));
            changeTemp.html('F');

        }
    });

}

function ktof(kelvin) {
    return Math.round((kelvin - 273) * (9 / 5) + 32);
}

function ftoc(fahr) {
    console.log(fahr);
    return Math.round((fahr - 32) * (5 / 9));
}

function ctof(cel) {
    return Math.round((cel * 9 / 5) + 32);

}

function setIcon(id) {
    if (id < 300) {
        return './img/thunderstorm.png';

    }
    if (id < 600) {
        return './img/raing.png';


    }

    if (id < 700) {
        return './img/snow.png';


    }

    if (id === 800) {
        return './img/sun.png';


    }

    if (id === 801) {
        return './img/partly-cloudy.png';


    }

    if (id < 900) {
        return './img/cloudy.png';
    }
}
