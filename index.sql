CREATE TABLE users (
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
    co_logo VARCHAR(300) NOT NULL,
    vol_date DATE NOT NULL ,
    vol_start_time TIME NOT NULL,
    vol_end_time TIME NOT NULL,
    vol_location VARCHAR(300) NOT NULL,
    vol_city VARCHAR(100) NOT NULL,
    co_phone VARCHAR(100) NOT NULL,
    co_email VARCHAR(100) NOT NULL,
    co_website VARCHAR(100) NOT NULL,
    vol_title VARCHAR(200) NOT NULL,
    vol_description VARCHAR(4000) NOT NULL
);

CREATE TABLE user_opportunities(
    id serial PRIMARY KEY,
    volunteer_id INTEGER NOT NULL,
    opportunity_id INTEGER NOT NULL
);

INSERT INTO volunteer_opportunities (co_logo, vol_date,vol_start_time,vol_end_time,vol_location, vol_city,co_phone, co_email,co_website,vol_title,vol_description)
VALUES ('https://www.propellus.org/content/propellus/volunteer/organization-profile/logo/Community-Future%20logo-variants/160w_thumb/Community-Future%20logo.JPG',
'2019-06-13',
'10:00:00',
'15:00:00',
'1111 - 11 Avenue SW, Calgary, AB, T2R 0G5',
'Calgary',
'403-290-5753',
'volunteer@ccisab.ca', 
'https://www.ccisab.ca', 
'Calgary Catholic Immigration Society',
'Calgary Catholic Immigration Society is a non-profit organization which provides settlement and integration services to all immigrants and refugees in Southern Alberta.

We are a community leader with over 35 years of solid experience in the design and delivery of comprehensive resettlement and integration services to refugees and immigrants. We pride ourselves in delivering these services through a dynamic multicultural, multilingual and multidisciplinary team of professionals, who collectively speak over 60 languages. This diversity enables us to provide our clients and the community with optimum assistance. We have over 1,500 volunteers who devote their time to helping newcomers.

We offer a wide variety of specialized services that were designed to aid and enhance the integration process.

Experience the world without leaving Calgary. Volunteer with immigrant and refugee families today!

Are you interested in interacting with people from different cultures? Do you want to make a difference in newcomers’ lives by supporting their transition to Calgary? Volunteers provide practical and social support to new immigrants and refugees, helping them to learn about Canadian culture, navigate transportation, health-care systems, find resources, practice English, and feel less isolated through participation in social activities. 

Each volunteer or group of volunteers is connected with an individual or family based on the volunteer’s preferences and the client’s needs. Factors to be considered include: volunteer’s skills, background, hobbies, and location in Calgary. Volunteers are expected to visit their assigned families once a week (for 1-4 hours), for 6 months to 1 year, in order to develop a trusting and supportive relationship.

All applicants are subjected to a screening process, and training will be provided on cross-cultural interaction, settlement processes, and practical mentorship support. Ongoing supervision, guidance, and professional development opportunities will be provided.

The Community Connections for Newcomers Program (CCN) is part of the comprehensive support CCIS provides to new immigrants.

If you have any questions or would like to apply, please contact Marcella Ducasses at 403 262 2013 or mducasses@ccisab.ca.' )


INSERT INTO volunteer_opportunities (co_logo, vol_date,vol_start_time,vol_end_time,vol_location, vol_city,co_phone, co_email,co_website,vol_title,vol_description)
VALUES ('https://www.propellus.org/content/propellus/volunteer/organization-profile/logo/1.%20CTH%20Main%20Logo-variants/160w_thumb/1.%20CTH%20Main%20Logo.jpg',
'2019-06-01',
'11:00:00',
'13:00:00',
'3507 A 17 Avenue SW , Calgary , AB, T3E 0B6',
'Cochrane',
'403-543-0550',
'volunteer@closertohome.com',
'www.closertohome.com',
'Volunteer Writer',
'This is a flexible opportunity for a volunteer writer to contribute to the community. Closer to Home is currently looking for writers to promote CTH’s programs/services, agency events, and stakeholder profiles through CTH print and digital publications, social media and website. The Writer represents the organization on a per project basis. Examples include: interviewing clients and/or staff for case stories, writing articles and blog posts, researching and writing social media posts, and more.

ABOUT CLOSER TO HOME: 

Our Mission: Empowering Families to Stay Together  Our Vision: Closer to Home is committed to contributing to a future where every child will belong to a family and feel valued and secure. Through the use of evidence-based practices and innovative solutions, CTH will strive to preserve, reunify and build stronger families who can care for their children and contribute meaningfully in their community. CTH will provide a broad array of strength-based and family-centered services that teach, coach and support families to create new possibilities and achieve better futures together.  Principles: Diversity Practices that accept and promote individual cultures, traditions, spiritual beliefs and lifestyles.  Services that recognize the complexity of social issues related to the trauma experienced by Indigenous communities and promote Indigenous values, health, wellness, and cultural connections.  Individualized Approach Interventions developed to preserve the family, in partnership with the child and family, are strength-based, inclusive, and solution focused.  Effective Services Integrated quality assurance systems provide the necessary feedback to improve services and facilitate continuous quality improvement that results in better outcomes for children and families.  Outcome-Focused Programs Meaningful outcomes are identified, measured, and achieved with integrity, excellence, and accountability.  Humane Practices Interactions with children and families are respectful, dignifying and positive. Interventions are trauma-informed and focused on family preservation. Children are safe, their opinions are valued and their choices respected.  Client Satisfaction Services solicit the opinion of all participants and stakeholders in a systematic manner, and are responsive to identified needs and concerns.  Collaborative and Inclusive The Organization participates in partnerships that offer benefit to, and reduce duplication of services for children and families.
')


CREATE TABLE co_login (
    id serial PRIMARY KEY,
    co_email text UNIQUE NOT NULL,
    co_pass VARCHAR(300) NOT NULL
);

CREATE TABLE companies(
    id serial PRIMARY KEY,
    co_name VARCHAR(200) NOT NULL, 
    co_email VARCHAR(100) NOT NULL,
    co_phone VARCHAR(100) NOT NULL,
    co_logo VARCHAR(300) NOT NULL,
    co_location VARCHAR(300) NOT NULL,
    co_city VARCHAR(100) NOT NULL,
    co_website VARCHAR(100) NOT NULL
);
