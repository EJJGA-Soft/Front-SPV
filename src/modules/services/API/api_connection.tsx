export function Api_Connection (){
    let variability_api_url: string;
    if(import.meta.env.VITE_PRODUCTION  === "true"){
        variability_api_url = import.meta.env.VITE_URL_PRODUCTION;
    } else {
        variability_api_url = import.meta.env.VITE_URL_DEVELOPER
    }

    return variability_api_url;
}