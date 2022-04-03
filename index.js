const express = require('express')
const app = express()
const port = 5003
const keys = require("./keys.json")
var bodyParser = require('body-parser')
const axios = require('axios')
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World! from story Dao backend')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.post('/openai', (req,res) => {

    console.log(req.body);

    let noun = req.body.noun;
    let adj = req.body.adj;
    let verb = req.body.verb;
    let place = req.body.place;
    let event = req.body.event;

    const url = 'https://api.openai.com/v1/engines/text-davinci-001/completions';

    const headers = {
        "Authorization": `Bearer ${keys.OpenAI}`
    }
    let prompt = `Complete this funny fairy tale and make it end with a ${event}: \n
        Once upon a time ${adj} ${noun} ${verb} in ${place} and`;

    let intro = `Once upon a time ${adj} ${noun} ${verb} in ${place} and`;

    const body = {
        "prompt": `${prompt}`,
        "max_tokens": 2000
    }

    axios.post(url,body,{headers})
    .then(response => {
        console.log(response.data.choices[0].text)
        res.send(`${intro} ${response.data.choices[0].text}`)
    })
    .catch(err => res.send(err))

})