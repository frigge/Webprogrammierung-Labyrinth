/**
 * This method makes an ajax call to json files and returns the data
 * @param url the file path
 * @return the file data or nothing
 */
function lab_ajaxGetJson(url){
    var xmlHttp = false;

    // check for browser compability (SOURCE: Webprogrammierung Skript)
    if(window.ActiveXObject) {
        try{
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        }catch(e){
            try{
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            }catch(e){
                throw new Error("No Ajax supported.");
            }
        }
    } else if(window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest;
    }

    xmlHttp.open("GET",url,false);
    xmlHttp.send();

    var response = xmlHttp.responseText;

    // check if response is valid JSON
    if(response){
        try {
            var data = JSON.parse(response);
        } catch(e) {
            throw new Error("No or no valid JSON");
        }

        return data;
    }

    return;
};