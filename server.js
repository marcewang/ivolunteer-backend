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

app.post('/register', (req, res) => {
    const { name, email, phone, password } = req.body
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
            })
    }).catch(err => res.status(400).json('unable to register'))

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
                res.status(400).json('Incorrect password')
            }
        }).catch(err => {
            res.status(400).json('Incorrect email')
        })
})

app.get('/opportunities', (req, res) => {
    const { location, date } = req.body
    db.select('*')
        .from('volunteer_opportunities')
        .where({
            location: location,
            vol_date: date // date returns weird 
        })
        .then(opportunities => {
            res.json(opportunities)
        })
})

app.get('/description', (req, res) => {
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



app.listen(3000)
console.log("App now listening on port 3000!")