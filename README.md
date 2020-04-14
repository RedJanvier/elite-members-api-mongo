# elite-members-api-mongo

[![Build Status](https://travis-ci.org/RedJanvier/elite-members-api-mongo.svg?branch=develop)](https://travis-ci.org/RedJanvier/elite-members-api-mongo)
[![DeepScan grade](https://deepscan.io/api/teams/6051/projects/7944/branches/88513/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=6051&pid=7944&bid=88513)
[![Maintainability](https://api.codeclimate.com/v1/badges/5c7500f7c37a67b9b509/maintainability)](https://codeclimate.com/github/RedJanvier/elite-members-api-mongo/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/RedJanvier/elite-members-api-mongo/badge.svg?branch=develop)](https://coveralls.io/github/RedJanvier/elite-members-api-mongo?branch=develop)

This is a REST API based on Node Js, Express, MongoDB, and JWT for authentication which is a duplicate of the [elite members api](https://github.com/RedJanvier/elite-members-api) and deals with managing and maintaining members of a class group called Elite.

## Features to implement

- ✔ Member should be able to leave the group
- ✔ Member should be able to update his/her informations
- ✔ Anyone should be able so see all members of the group
- ✔ Anyone should be able to get all details of any member
- ✔ Member should be able to Join the group with image upload
- ❌ Member (committee) should be able to log into his/her group account

## Routes

#### See all members

```
[GET] /api/v2/members/

:body: none
```

#### See a single member

```
[GET] /api/v2/members/:memberId

:body: none
```

#### Create a members

```
[POST] /api/v2/members/create

:body: (form-data) {
    name "STRING",
    email "STRING",
    shares "INTEGER",
    location "STRING",
    img "FORM-DATA",
    committee "STRING" (optional),
    password "STRING"
}
```

#### Edit a member

```
[PATCH] /api/v2/members/:memberId

:body: (updates_only) {
    name "STRING",
    email "STRING",
    shares "INTEGER",
    location "STRING",
    img "URL",
    committee "STRING" (optional),
    password "STRING"
}
```

#### Remove a members

```
[DELETE] /api/v2/members/:memberId

:body: none
```

## Tech stack

- Node JS
- Express JS
- MongoDB
- bcrypt
- jsonwebtokens
- jest
- multer

## Author

### **RedJanvier**

## Contacts

[Github](https://github.com/RedJanvier)
[Twitter](https://twitter.com/red_janvier)
[YouTube](https://www.youtube.com/channel/UCrQBNajZa-ibHBerJQ0kAiQ)
[Facebook](https://facebook.com/jan.h.red)
