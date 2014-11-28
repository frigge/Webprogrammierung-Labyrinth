
var lab_ajaxGetJson = function(url){
    
    var xhr         = false,
        response    = false; 

    if ('undefined' !== typeof XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    }
    
    xhr.open("GET",url,false);
    xhr.send();
    
    response = xhr.responseText;
    
    if(response){
        return JSON.parse(response);
    }
    
    return {};
};

