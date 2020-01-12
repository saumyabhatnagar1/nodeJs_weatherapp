const request=require('request');
const weather=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/40f4aaf8dfb2363dae611f39b4218783/'+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'?units=si&lang=hi'
    request({url,json:true},(error,{body})=>{
        if(error)
        {
            callback('Unable to connect ot the weather services',undefined)
        }
        else if(body.error)
        callback(body.error,undefined)
        else {
            
            callback(undefined,
              'The temperature is '+  body.currently.temperature+'. The chances of precipation are '+(body.daily.data[0]. precipProbability)*100+'%. The humidity is '+body.daily.data[0].humidity+'. The maximum temperature and minimum temperature will be '+body.daily.data[0].temperatureHigh+' and  '+body.daily.data[0].temperatureLow )
        }
    })
}
module.exports=weather;