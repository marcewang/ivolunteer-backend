## iVolunteer Back-end
A website to find volunteering opportunities.

## Motivation
As a person that loves to volunteer, sometimes finding volunteering opportunities last minute its hard. 
This website was designed having in mind that sometimes people have suddently a weekend off and would like to volunteer. This website allows you to sign up whenever you are free, without having to contact the non-profit organization and waiting for a response. 


## Installation steps: 
- Clone repository 
- run "npm install"
- Using PostgreSQL run contents of "index.sql". 
- Customize "server.js" 

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'xxx
        password: xxx
        database: xxx
    }
});

- run "npm start"
