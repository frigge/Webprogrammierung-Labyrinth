function lab_SoundController(){
    
    this.domElement = null;
    
    try {
        this.soundDescription   = lab_ajaxGetJson('view/sounds.json');
    }
    catch(e) {
        throw new Error("Sound file could not be loaded! Reason: " + e.message);
    }
    
    this.init();
}

/**
 * This method will initialize the sound and created a "div" for sound from the sounds.json file
 * if in some description the attribute autoplay, start and play the sound in loop
 */
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


lab_SoundController.prototype.getDomElement = function(){
    return this.domElement;
};

