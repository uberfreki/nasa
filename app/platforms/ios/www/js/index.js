/* really cool something */

var app = {
    data: {},
    config: {
        domain : 'awesome.domain'
    },
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        if(navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
            // is native
            document.addEventListener('deviceready', this.deviceReady, false);
            document.addEventListener('pause', this.pause, false);
            document.addEventListener('resume', this.resume, false);
            app.isMobile = true;
        } else {
            document.addEventListener('DOMContentLoaded', this.browserReady, false);
            app.isMobile = false;
        }
    },
    deviceReady: function() {
        $('#camera').click(function(){
            app.takePhoto();
        });
        $('#choose').click(function(){
            app.choosePhoto();
        });
        FastClick.attach(document.body);
    },
    browserReady: function() {
        console.log('browser ready');
        $('.attribute a').click(function(){
            var label = $(this).data('label');
            var value = $(this).data('value');
            console.log(label + ': ' + value);
        });
        $('#camera').click(function(){
            $('#take').hide();
            $('#input').show();
            $('#fake').show();
            $('#photo').empty().append('<img src="img/temp.jpg"/>');
        });
    },
    pause: function() {
        console.log('app paused');
    },
    resume: function() {
        console.log('app resumed');
    },
    takePhoto: function() {
            navigator.camera.getPicture(app.addPhoto, app.errorHandler, { 
                quality: 40,
                destinationType: Camera.DestinationType.DATA_URL,
                saveToPhotoAlbum: true,
                correctOrientation: true,
                targetWidth: 1024,
                targetHeight: 768
            });
    },
    addPhoto: function(imageData) {
        $('#take').hide();
        $('#photo').empty();
        var photo = $('<img/>').appendTo('#photo');
        $(photo).attr('src','data:image/jpeg;base64,' + imageData);
        app.image = imageData;
        $('#input').show();
    },
    goBack: function() {
        $('#take').show();
        $('#input').hide();
    },
    submit: function(e) {
        var url = 'https://api.imgur.com/3/upload';
        $.ajax({
          method: "POST",
          url: url,
          headers: {
            Authorization: "Client-ID 17cb7a3a2baa2df",
          },
          data: { 
            image: app.image, 
            type: "base64",
            title: "test"
        }
        }).success(function( result ) {
            var id = result.data.id;
            window.location = 'https://imgur.com/gallery/' + id;
        }).fail(function( result ) {
            $('.alert').show().html(result);
            console.log(result);
        });
    },
    choosePhoto: function() {
        navigator.camera.getPicture(app.addPhoto, app.errorHandler, { 
            destinationType: Camera.DestinationType.DATA_URL,
            correctOrientation: false,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        });
    },
    errorHandler: function() {
       
    }
};

app.initialize();