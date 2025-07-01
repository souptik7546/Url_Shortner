import supabase from "./Supabase";

export async function getClicksUrls(urlIds){
    const{data,error}= await supabase.from('clicks').select('*').in('url_id', urlIds)
    if(error){
        console.log(error.message);
        
        throw new Error(error.message)
    } 
        return data;
}

export async function getClicksForUrl(url_id){
    const{data,error}= await supabase.from('clicks').select('*').eq('url_id',url_id);
    if(error){
        console.log(error.message);
        
        throw new Error("unable to load stats")
    } 
        return data;
}