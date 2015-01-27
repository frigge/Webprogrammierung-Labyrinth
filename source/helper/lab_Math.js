/**
 * creates a random integer value
 * @param max the maximum size which is used for randomization
 * @return a randomized integer value
 */
var randomInt = function(max){
    return Math.floor(Math.random() * (max+1));
};

/**
 * creates a unique id
 * uses the corresponding three.js method 
 * @return a unique id
 */
var generateUUID = function(){
    return THREE.Math.generateUUID();
};
