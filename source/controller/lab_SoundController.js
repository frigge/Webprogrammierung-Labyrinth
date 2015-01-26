function lab_SoundController(){
    
    this.domElement = null;
    
    this.soundDescription   = lab_ajaxGetJson('resources/sounds.json');
    
    this.init();
    
}

lab_SoundController.prototype.init = function(){
    
    var soundsWrapper = document.createElement('div');
    
    for(var key in this.soundDescription){
        var description  = this.soundDescription[key];
        var sound        = document.createElement('audio');
            sound.volume = description.volume;
            sound.src    = description.url;
            sound.setAttribute('id', description.id);
        
        if(description.autoPlay){
            sound.setAttribute('loop', 'loop');
            sound.play();
        }
        
        soundsWrapper.appendChild(sound);
        
    }
    
    this.domElement = soundsWrapper;
    
};


/*
lab_SoundController.prototype.playSound = function(key){

    var sound = document.getElementById(key);
    
    if(sound){
        // chrome specific handling
        if(window.chrome){
            sound.load();
        } 
        sound.currentTime = 0;
        sound.play();
    }
    
};

lab_SoundController.prototype.stopPlayback = function(key){
  
    var sound = document.getElementById(key);
    
    if(!sound.paused){
        sound.pause();
        sound.currentElement = 0;
    }
    
};

lab_SoundController.prototype.startPlayback = function(key){
    
    var sound = document.getElementById(key);
    
    if(sound.paused){
        this.playSound(key);
    }
    
};


lab_SoundController.prototype.getDomElement = function(){
    return this.domElement;
};
*/
