


var weatherform=document.querySelector('form');
var search=document.getElementById('searchc')
weatherform.addEventListener('submit',(e)=>{
    e.preventDefault();
    var city=search.value;
    document.getElementById('load').textContent="Loading...";
    document.getElementById('weather').textContent="";
    fetch('/weather?address='+city).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            return console.log(data.error)
        }
        console.log(data)
        document.getElementById('load').textContent=data.location;
        document.getElementById('weather').textContent=data.forecast;
    })
})

    
})