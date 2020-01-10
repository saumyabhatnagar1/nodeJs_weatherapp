const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode.js');
const weather=require('./utils/weather.js');
const app=express();
const viewPath=path.join(__dirname,'../templates/views')
const partialpath=path.join(__dirname,'../templates/partials')
app.use(express.static(path.join(__dirname,'../public')))
app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialpath)
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Saumya Bhatnagar'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{title:'About',name:'Saumya Bhatnagar'})
})
app.get('/help',(req,res)=>{
    res.render('help',{help:'click here for some help',
title:'Help Text',
name:'Saumya Bhatnagar'})
})


app.get('/weather',(req,res)=>{
    if(!req.query.address)
        return res.send('Provide an adrress');
    geocode(req.query.address,(error,{longitude,latitude,location}) =>{
        if(error)
        {
            return res.send({
                error
            })
        }
        weather(latitude,longitude,(error,forecastdata)=>{
            if(error)
            {
                return res.send({error});
            }
            res.send({
                forecast:forecastdata,
                location,
                address:req.query.address,
            })
            
        })

    })
    

    
   
})



app.get('/help/*',(req,res)=>{
    res.render('404page',{data:'Help article not found'});
})

app.get('*',(req,res)=>{
    res.render('404page',{data:'Page not found',name:'Saumya Bhatnagar'})
})
app.listen(3000,()=>{
    console.log('Server running')
})