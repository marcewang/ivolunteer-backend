CREATE TABLE user (
    id serial PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email text UNIQUE NOT NULL,
    phone VARCHAR(100) NOT NULL
);

CREATE TABLE user_login (
    id serial PRIMARY KEY,
    email text UNIQUE NOT NULL,
    pass_hash VARCHAR(300) NOT NULL
);

CREATE TABLE volunteer_opportunities(
    id serial PRIMARY KEY,
    co_name VARCHAR(100) NOT NULL,
    co_logo VARCHAR(300) NOT NULL,
    vol_description VARCHAR(2000) NOT NULL,
    vol_time TIME NOT NULL,
    vol_date DATE NOT NULL ,
    location VARCHAR(100) NOT NULL
);

CREATE TABLE user_opportunities(
    id serial PRIMARY KEY,
    volunteer_id INTEGER NOT NULL,
    opportunity_id INTEGER NOT NULL
);

INSERT INTO volunteer_opportunities (co_name,co_logo,vol_description,vol_time,vol_date,location)
VALUES ('Salvation Army','https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/The_Salvation_Army.svg/200px-The_Salvation_Army.svg.png','Looking for someone to help set up a booth to receive donations', '10:00:00','2019-12-2', 'Calgary')

INSERT INTO volunteer_opportunities (co_name,co_logo,vol_description,vol_time,vol_date,location)
VALUES ('Calgary Public Library','https://presspage-production-content.s3.amazonaws.com/uploads1485/500_calgarypubliclibrarylogogreytransparentbackground-313723.png?x=1544738883211','Looking for someone to greet library vistitors', '10:00:00','2019-12-2', 'Calgary')