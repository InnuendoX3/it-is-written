## Endpoints

### Bible info
#### GET /api/bibles
Bibles available on application
> Output
```json
[
  {
    "abbreviation": "KJV",
    "name": "King James Version",
    "language": "English"
  },
  {
    "abbreviation": "FBV",
    "name": "Free Bible Version",
    "language": "English"
  },
  ...
]
```

#### GET /api/bibles/:bibleAbbr/books
Return Bible books
*bibleAbbr* abbreviation of the choosen Bible: *KJV*, *RVR90*
> Output
```json
{
  "bible": {
    "abbreviation": "KJV",
    "name": "King James Version"
  },
  "books": [
    {
      "id": "GEN",
      "name": "Genesis"
    },
    {
      "id": "EXO",
      "name": "Exodus"
    },
    {
      "id": "LEV",
      "name": "Leviticus"
    },
    ...
  ]
}
```

#### GET /api/bibles/:bibleAbbr/books/:bookId/chapters
Return book chapters
> Output
```json
{
  "bible": {
    "abbreviation": "KJV",
    "name": "King James Version"
  },
  "chapters": [
    {
      "id": "DEU.intro",
      "bookId": "DEU",
      "number": "intro",
      "reference": "Deuteronomy"
    },
    {
      "id": "DEU.1",
      "bookId": "DEU",
      "number": "1",
      "reference": "Deuteronomy 1"
    },
    ...
  ]
}
```

#### GET /api/bibles/:bibleAbbr/chapters/:chapterId/verses
Return chapter verses
> Output
```json
{
  "bible": {
    "abbreviation": "KJV",
    "name": "King James Version"
  },
  "verses": [
    {
      "id": "JOS.16.1",
      "reference": "Joshua 16:1",
      "number": "1"
    },
    {
      "id": "JOS.16.2",
      "reference": "Joshua 16:2",
      "number": "2"
    },
    ...
  ]
}
```

#### GET /api/bibles/:bibleAbbr/verses/:verseId
-- Not used --
Return a single verse
> Output
```json
{
  "id": "JHN.14.15",
  "reference": "John 14:15",
  "content": "If you love me, you will keep my commands.",
  "copyright": "Dr. Jonathan Gallagher. Released under Creative Commons Attribution-ShareAlike 4.0 Unported License. Version 3.1 beta. For corrections send email to jonathangallagherfbv@gmail.com",
  "bible": "Free Bible Version"
}
```

#### GET /api/bibles/:bibleAbbr/passages/:passageRange
Return a passage.
Passage is the text between two verses.
*passageRange* is composed by two verses. Ex: *LUK.11.15-LUK.11.18*
> Output
```json
{
  "passageRange": "LUK.11.15-LUK.11.18", // Not used on client
  "reference": "Luke 11:15-18",
  "content": "But some of them said, “He is driving out demons using the power of Beelzebub, the ruler of demons.” Others were trying to test Jesus by demanding a miraculous sign from heaven. Jesus knew what they were thinking and said, “Any kingdom divided against itself will collapse. A family divided against itself will fall. If Satan is divided against himself, how can his kingdom stand? You say that I cast out demons using the power of Beelzebub.",
  "copyright": "Dr. Jonathan Gallagher. Released under Creative Commons Attribution-ShareAlike 4.0 Unported License. Version 3.1 beta. For corrections send email to jonathangallagherfbv@gmail.com",
  "bible": "Free Bible Version"
}
```

### Compare - Diff
#### POST /api/texts/compare
Return the results of comparing the Bible text with the written by the user
> Body
```json
{
	"bibleText": "Jesus said to his disciples: If you love me, you will do as I command.",
	"userText": "Jesus said to his people: If you love me, you will do as I say."
}
```
> Output
```json
{
  "differences": [
    {
      "count": 4,
      "value": ["Jesus", "said", "to", "his"]
    },
    {
      "count": 1,
      "removed": true,
      "value": ["disciples:"]
    },
    {
      "count": 1,
      "added": true,
      "value": ["people:"]
    },
    {
      "count": 9,
      "value": ["If", "you", "love", "me,", "you", "will", "do", "as", "I"]
    },
    {
      "count": 1,
      "removed": true,
      "value": ["command."]
    },
    {
      "count": 1,
      "added": true,
      "value": ["say."]
    }
  ],
  "percentage": 87,
  "bibleTextWordsQty": 15,
  "matchedWords": 13
}
```

### Favourite passages
Are passages from API Bible that the user wanted to save as favourite

#### GET /api/passages/
ONLY REGISTERED USERS: Return a list with favourite passages saved by user
> Headers - authorization: Bearer JWT
> Output
```json
[
  {
    "_id": "60a28d0afb77f64aa8f3588c",
    "content": "“How can you be reborn when you're old?” Nicodemus asked. “You can't go back into your mother's womb and be born a second time!”",
    "reference": "John 3:4",
    "bible": "Free Bible Version",
    "language": null,
    "average": 70
  },
  ...
]

```

#### GET /api/passages/:id
ONLY REGISTERED USERS: Return a favourite passage.
> Headers - authorization: Bearer JWT
> Output
```json
{
  "isFavourite": true,
  "isRandom": false,
  "diffResults": [
    11,
    100,
    100,
    19
  ],
  "_id": "60a28d0afb77f64aa8f3588c",
  "content": "“How can you be reborn when you're old?” Nicodemus asked. “You can't go back into your mother's womb and be born a second time!”",
  "reference": "John 3:4",
  "bible": "Free Bible Version",
  "language": null,
  "user": "60a2893afb77f64aa8f35889",
  "average": 57.5
}
```

#### POST /api/passages/ 
ONLY REGISTERED USERS: Save a favourite passage
> Headers - authorization: Bearer JWT
> Body
```json
{
  "reference": "John 4:15-17",
  "content": "“Sir,” replied the woman, “Please give me this water so I won't be thirsty, and I won't have to come here to fetch water!” “Go and call your husband, and come back here,” Jesus told her. “I don't have a husband,” the woman answered.“You're right in saying you don't have a husband,” Jesus told her.",
  "bible": "Free Bible Version"
}
```
> Output
```json
{
  "message": "Passage saved as favourite",
  "body": {
    "isFavourite": true,
    "isRandom": false,
    "diffResults": [],
    "_id": "60a4e7b78684cd6bfcf49a34",
    "content": "“Sir,” replied the woman, “Please give me this water so I won't be thirsty, and I won't have to come here to fetch water!” “Go and call your husband, and come back here,” Jesus told her. “I don't have a husband,” the woman answered.“You're right in saying you don't have a husband,” Jesus told her.",
    "reference": "John 4:15-17",
    "bible": "Free Bible Version",
    "language": null,
    "user": "60a28959fb77f64aa8f3588b",
    "__v": 0
  }
}
```

#### DELETE /api/passages/:id 
ONLY REGISTERED USERS: Delete a favourite passage
> Headers - authorization: Bearer JWT
> Output
```json
{
  "message": "Passage deleted"
}
```

#### PATCH /api/passages/:id 
ONLY REGISTERED USERS: Delete a favourite passage
> Headers - authorization: Bearer JWT
> Body
```json
{
	"passageDiffResult": 97
}
```
> Output
```json
{
  "message": "Diff result added"
}
```


### Random passages
Passages saved by admin on the DB. Doesn't come from the BibleAPI
'language' key should be fylled.
These passages are used when the user ask for a random passage

#### POST /api/passages/random
ONLY ADMIN: Create a random passage
> Body
```json
{
  "reference": "Matthew 28:18",
  "content": "Then Jesus came to them and said, “All authority in heaven and on earth has been given to me.",
  "bible": "New International Version",
	"language": 1
}
```
> Output
```json
{
  "message": "Random passage created",
  "body": {
    "isFavourite": false,
    "isRandom": true,
    "diffResults": [],
    "_id": "60a510145180676434937033",
    "content": "Then Jesus came to them and said, “All authority in heaven and on earth has been given to me.",
    "reference": "Matthew 28:18",
    "bible": "New International Version",
    "language": 1,
    "user": "60a36fc0f46a3d566c36a14d",
    "__v": 0
  }
}
```

#### GET /api/passages/random/
ONLY ADMIN: Return a list of random passages
> Output
```json
[
  {
    "_id": "60a1596dd0fde41ca83f5530",
    "content": "Señor, digno eres de recibir la gloria y la honra y el poder; porque tú creaste todas las cosas, y por tu voluntad existen y fueron creadas.",
    "reference": "Apocalipsis 4:11",
    "bible": "Reina-Valera 1960",
    "language": 2
  },
  {
    "_id": "60a39a8758c6882cd8e9f656",
    "content": "Then Jesus came to them and said, “All authority in heaven and on earth has been given to me.",
    "reference": "Matthew 28:18",
    "bible": "New International Version",
    "language": 1
  },
  ...
]
```

#### GET /api/passages/random/passage/?language=1
Return a random passage - english or spanish determined by req.query.language
> Output
```json
{
  "_id": "60a1596dd0fde41ca83f5530",
  "content": "Señor, digno eres de recibir la gloria y la honra y el poder; porque tú creaste todas las cosas, y por tu voluntad existen y fueron creadas.",
  "reference": "Apocalipsis 4:11",
  "bible": "Reina-Valera 1960",
  "language": 2
}
```
#### DELETE /api/passages/random/:id 
ONLY ADMIN: Delete a random passage
> Headers - authorization: Bearer JWT
> Output
```json
{
  "message": "Random passage deleted"
}
```


### Users
Passages saved by admin, 'language' key should be fylled.

#### POST /api/register
Creates an user and login at once
> Body
```json
{
	"username": "Juancho",
	"email": "juancho@jotmail.com",
	"password": "12345",
	"role": "user"
}
```
> Output
```json
{
  "message": "User signed up and logged in!",
  "user": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGEzNmM0M2Y0NmEzZDU2NmMzNmE3xNGMiLCJ1ddc2VybIkp1YW5jaG8iLCJyb2xlIjoidXNlciIsImlhdCI6MTYyMTMyMjSwiZXhwIjoxNjIxMzMzNjE5fQ.OWXqLa8vaLZ1oi-4I3uEthUfh6ebSTVnW_Y",
    "user": {
      "username": "Juancho",
      "email": "juancho@jotmail.com",
      "role": "user"
    }
  }
}
```

#### POST /api/login
Login user
> Body
```json
{
	"email": "maria@jotmail.com",
	"password": "12345"
}
```
> Output
```json
{
  "message": "Logged in!",
  "user": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGEyODk1OWZiNzdmNjRhYThemMzU4OGIiLCJ1c2VybmFtZSI6Ik1hcmXIiLCJpYXQiOjE2MjE1MDM0NTQsImV4cCI6MTYyMTUyNTA1NH0.sIX6jttGgAKiCvdNkfxD-sAv3FtinAZPYYswuNSf_qBx0",
    "user": {
      "username": "Maria",
      "email": "maria@jotmail.com",
      "role": "user"
    }
  }
}
```

#### POST /api/me
Login user
> Headers - authorization: Bearer JWT
> Output
```json
{
  "username": "Pedro",
  "email": "pedro@jotmail.com",
  "role": "user"
}
```
