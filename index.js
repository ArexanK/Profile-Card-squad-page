import express from 'express'

const url = 'https://whois.fdnd.nl/api/v1/squad/'

// Maak een nieuwe express app
const app = express()


// Stel in hoe we express gebruiken
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))

// Maak een route voor de index
app.get('/', (request, response) => { // '/' route die je maakt voor een nieuw pagina
  console.log(request.query.squad);

  let slug = request.query.squad || 'squad-a-2022'; // request squad en anders default op squad a
  let orderBy = request.query.orderBy || 'name'; // sorteer op naam functie
  let squadUrl = url + slug + '?orderBy=' + orderBy + '&direction=ASC'; //

  fetchJson(squadUrl).then((data) => {
    let dataClone = structuredClone(data);

    // 1) als request.query.name bestaat
    if (request.query.name) {
      // 2) Filter dan uit de data alle mensen die niet dat deel in hun naam hebben
      dataClone.squad.members = dataClone.squad.members.filter(function (member) {
        // 3 zoekfunctie  op naam+ achternaam. (hoofdlettergevoelig in script.js geplaatst)
        return member.name.includes(request.query.name) || member.surname.includes(request.query.name)
      })
    }

    response.render('index', dataClone)
  });
})





// Maak een route voor de members
app.get('/members', (request, response) => {

  let id = request.query.member || 'cldemsxee3oeg0avw60bcsibn'
  let memberUrl = 'https://whois.fdnd.nl/api/v1/member?id=' + id

  fetchJson(memberUrl).then((data) => {
    // console.log(data)
    if (!data.member.gitHubHandle.startsWith('https://www.github.com/')) {
      data.member.gitHubHandle = 'https://www.github.com/' + data.member.gitHubHandle; // github handle gekoppeld per member
    }
    response.render('member', data)
  })
})

// Maak een route voor de members
app.get('/about', (request, response) => {
  response.render('about')
})


// app.get('/members', (request, response) => {
//   response.send('Joepie!!')
// })

// Stel het poortnummer in en start express
app.set('port', process.env.PORT || 4000)
app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})

/**
 * Wraps the fetch api and returns the response body parsed through json
 * @param {*} url the api endpoint to address
 * @returns the json response from the api endpoint
 */
async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => error)
}