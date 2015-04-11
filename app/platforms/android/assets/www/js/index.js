/* really cool something */

var app = {
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
        } else {
            document.addEventListener('DOMContentLoaded', this.browserReady, false);
        }
    },
    deviceReady: function() {
        $('#take').click(function(){
            app.takePhoto();
        });
        $('#choose').click(function(){
            app.choosePhoto();
        });
        FastClick.attach(document.body);
    },
    pause: function() {
        console.log('app paused');
    },
    resume: function() {
        console.log('app resumed');
    },
    browserReady: function() {
        console.log('browser ready');
        $('#take').click(function(){
            alert('take');
        });
    },
    takePhoto: function() {
        navigator.camera.getPicture(app.addPhoto, app.errorHandler, { 
            quality: 40,
            destinationType: Camera.DestinationType.DATA_URL,
            saveToPhotoAlbum: true,
            correctOrientation: false,
            targetWidth: 1024,
            targetHeight: 768
        });
    },
    addPhoto: function(imageData) {
        var photo = $('<img/>').appendTo('#photos');
        $(photo).attr('src','data:image/jpeg;base64,' + imageData);
        $(photo).click(function(e){
            $(this).remove();
        });
    },
    removePhoto: function(e) {

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