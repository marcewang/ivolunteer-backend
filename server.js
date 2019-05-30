const express = require('express')
const knex = require('knex')
const cors = require('cors')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')


const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'password',
        database: 'ivolunteer'
    }
});

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/', (req, res) => {
    res.send('hello')
})

app.get('/cities', (req, res) => {
    db.select('vol_city').count('*')
        .from('volunteer_opportunities')
        .groupBy('vol_city')
        .then(results => {
            res.json(results)
        }).catch(err => res.status(400).json(err))

})

app.get('/dates/:city', (req, res) => {
    const { city } = req.params
    db.select('vol_date')
        .from('volunteer_opportunities')
        .where('vol_city', city)
        .groupBy('vol_date')
        .then(dates => {
            res.json(dates)
            console.log(dates)
        })
})

app.get('/opportunities/:city/:date', (req, res) => {
    const { city, date } = req.params
    db.select('*')
        .from('volunteer_opportunities')
        .where(!date === "alldates" ? {
            vol_city: city,
            vol_date: date // date returns weird 
        } : { vol_city: city })
        .then(opportunities => {
            res.json(opportunities)
        })
}
)

app.get('/myaccount/:email', (req, res) => {
    const { email } = req.params
    db('users')
        .join('user_opportunities', 'users.id', 'user_opportunities.volunteer_id')
        .join('volunteer_opportunities', 'opportunity_id', 'volunteer_opportunities.id')
        .returning('*')
        .where('email', email)
        .then(accountdetails => {
            res.json(accountdetails)
        })
        .then(console.log)
        .catch(err => res.status(400).json(err))
})

app.get('/user/:email', (req, res) => {
    const { email } = req.params
    db.select('*')
        .from('users')
        .where('email', email)
        .then(userInfo => { res.json(userInfo) })
        .catch(err => res.status(400).json(err))
})

app.post('/register', (req, res) => {
    const { name, email, phone, password } = req.body
    if (!email || !name || !password || !phone) {
        return res.status(400).json('incorrect form submission') //need to return otherwise the rest of the stuff will still run.. so the user is still registered
    }
    let hash = bcrypt.hashSync(password, 10)
    db.transaction(trx => {
        trx.insert({
            email: email,
            pass_hash: hash
        })
            .into('user_login')
            .returning('email')
            .then(loginEmail => {
                return trx('users').insert({
                    name: name,
                    email: loginEmail[0],
                    phone: phone
                })
                    .returning('*')
                    .then(user => {
                        res.json(user[0])
                    })
                    .then(trx.commit)
                    .then(trx.rollback)
            }).catch(err => res.status(400).json(err.detail))
    })
})

app.post('/signin', (req, res) => {
    const { email, password } = req.body
    db.select('pass_hash', 'email')
        .from('user_login')
        .where('email', email)
        .then(login => {
            let isValid = bcrypt.compareSync(password, login[0].pass_hash)
            if (isValid) {
                res.json(login[0].email)
            } else {
                res.status(400).json("error")
            }
        }).catch(err => {
            res.status(400).json("error")
        })
})

app.post('/signup', (req, res) => {
    const { email, id } = req.body
    db.transaction(trx => {
        trx.select('id')
            .from('users')
            .where('email', email)
            .then(userId => {
                return trx.insert(
                    {
                        volunteer_id: userId[0].id,
                        opportunity_id: id
                    }
                )
                    .into('user_opportunities')
                    .returning('*')
                    .then(user_opportunity => {
                        res.json(user_opportunity)
                    })
                    .then(trx.commit)
                    .then(trx.rollback)
            }).catch(err => res.status(400).json(err))
    })
})

app.post('/description', (req, res) => {
    const { id } = req.body
    db.select('*')
        .from('volunteer_opportunities')
        .where({
            id: id
        })
        .then(opportunity => {
            res.json(opportunity[0])
        })

})
//--------------------------------------------------------------------------------------------------------------------
//COMPANIES ROUTES
//---------------------------------------------------------------------------------------------------------------------
app.post('/registerco', (req, res) => {
    const { name, email, password, phone, logo, location, city, website } = req.body
    if (!name || !email || !password || !phone || !logo || !location || !city || !website) {
        return res.status(400).json('incorrect form submission') //need to return otherwise the rest of the stuff will still run.. so the user is still registered
    }
    let hash = bcrypt.hashSync(password, 10)
    db.transaction(trx => {
        trx.insert({
            co_email: email,
            co_pass: hash
        })
            .into('co_login')
            .returning('co_email')
            .then(loginEmail => {
                return trx('companies').insert({
                    co_name: name,
                    co_email: loginEmail[0],
                    co_phone: phone,
                    co_logo: logo,
                    co_location: location,
                    co_city: city,
                    co_website: website
                })
                    .returning('*')
                    .then(user => {
                        res.json(user[0])
                    })
                    .then(trx.commit)
                    .then(trx.rollback)
            }).catch(err => res.status(400).json(err.detail))
    })
})


app.post('/signinco', (req, res) => {
    const { email, password } = req.body
    db.select('co_email', 'co_pass')
        .from('co_login')
        .where('co_email', email)
        .then(login => {
            let isValid = bcrypt.compareSync(password, login[0].co_pass)
            if (isValid) {
                res.json(login[0].co_email)
            } else {
                res.status(400).json('error')
            }
        }).catch(err => {
            res.status(400).json('error')
        })
})


app.get('/userco/:email', (req, res) => {
    const { email } = req.params
    db.select('*')
        .from('companies')
        .where('co_email', email)
        .then(userInfo => { res.json(userInfo) })
        .catch(err => res.status(400).json(err))
})

app.get('/accountco/:email', (req, res) => {
    const { email } = req.params
    db.select('*')
        .from('volunteer_opportunities')
        .where('co_email', email)
        .then(userInfo => { res.send(userInfo) })
        .catch(err => res.status(400).json(err))
})

app.post('/postopportunity', (req, res) => {
    const { logo, date, start_time, end_time, location, city, phone, email, website, title, description } = req.body
    let parsedCityArray = city.toLowerCase().split("")
    parsedCityArray[0] = parsedCityArray[0].toUpperCase()
    db('volunteer_opportunities')
        .insert({
            co_logo: logo,
            vol_date: date,
            vol_start_time: start_time,
            vol_end_time: end_time,
            vol_location: location,
            vol_city: parsedCityArray.join(""),
            co_phone: phone,
            co_email: email,
            co_website: website,
            vol_title: title,
            vol_description: description
        })
        .returning('*')
        .then(opportunity => res.json(opportunity))
        .catch(err => res.status(400).json(err))
})



app.listen(3000)
console.log("App now listening on port 3000!")