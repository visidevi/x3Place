

(function ($) {
    $(function () {

        //initialize all modals           
        $('.modal').modal();

        //now you can open modal from code
        $('#modal1').modal('open');

        //or by click on trigger
        $('.trigger-modal').modal();

    }); // end of document ready
})(jQuery);

$(function() {
    var app_id = '229481407597435';
    var scopes = 'email, user_friends, public_profile';
    var btn_login = '<a href="#" id="login" class="btn btn-primary">Iniciar secion con Facebook</a>'
    var div_session = "<div id='facebook-session'>";+
                "<srtrong></strong>"+
                "<img>"+
                '<a href="#" id="logout" class="btn btn-danger">Cerrar sesion</a>'+
                "</div>";


window.fbAsyncInit = function() {
    FB.init({
        appId: app_id,
        status  :true,
        cookie: true,
        xfbml: true,
        version: "v2.8"
    });

 FB.getLoginStatus(function(response) {
    statusChangeCallback(response, function(){

    });
 });
};
 var statusChangeCallback = function(response, callback) {
    console.log(response);

    if(response.status === 'connected') {
        getFacebookData();
    }else {
        callback(false);
    }
}

    var checkLoginState = function(callback) {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response, function(data) {
        callback(data);
        });
    });
   }
   var getFacebookData = function()
   { 
        FB.api('/me', function(response){
            $('#login').affter(div_session);
            $('#login').remove();
            $('#facebook-session strong').text("Bienvenido: "+response.name);
            $('#facebook-session img').attr('src', 'http//graph.facebook.com/'+response.id+'/picture?type=large');
        });
   }

   var facebookLogin = function(){
    checkLoginState(function(response){
        if(!response) {
            FB.login(function(response){
                if (response.status === 'connected')
                    getFacebookData();
            }, {scope: scopes})
        }

    })
   }

   var facebookLogout = function() {
    FB.getLoginStatus(function(response){
        if (response.status === 'connected') {
            FB.logout(function(response){
                $('#facebook-session').before(btn_login);
                $('#facebook-session').remove();
            })
        }

    });
   }

$(document).on('click', '#login', function(e) {
    e.preventDefault();

    facebookLogin();
})

$(document).on('click', '#logout', function(e) {
    e.preventDefault();

if(confirm("esta seguro?"))
    facebookLogout();
else
    return false;
})


})

      console.log(data);  
      $('#dayAll').append(
      	` <div class="white-text ">
      	<h3>Santiago</h3>
      	<canvas id="ico" width="50" height="50"></canvas>
      	<h1>${Math.floor(data.currently.temperature)}°C</h1>
      	
      	<table class="centered responsive-table ">
        <thead>
          <tr>
              <th>Temperatura</th>
              <th>Viento</th>
              <th>Humedad</th>
              <th>Indic Uv</th>
              <th>Presión</th>
          </tr> 
       </thead>
        <tbody>
            <tr>
              <td>${Math.floor(data.currently.temperature)}°</td>
              <td>${data.currently.windSpeed}</td>
              <td>${data.currently.windSpeed}</td>
              <td>${data.currently.uvIndex}</td>
              <td>${data.currently.pressure}</td>
          </tr>
        </tbody>
         <hr>
       </table> 
        <hr>
       `
      	);
       const skycons = new Skycons({ 
        'color': '#fafafa',
      });
      skycons.add("ico", `${data.currently.icon}`);
      skycons.play();



