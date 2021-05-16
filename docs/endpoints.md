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
    {
      "id": "DEU.2",
      "bookId": "DEU",
      "number": "2",
      "reference": "Deuteronomy 2"
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
  "verseRange": "LUK.11.15-LUK.11.18", // Not used on client
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
Are passages got from API Bible that the user choose to save as favourite

#### GET /api/passages/
ONLY REGISTERED USERS: Return a list with favourite passages saved by user
> Headers - userId ?
> Output
```json
[
  {
    "reference": "Luke 11:15-18",
    "content": "But some of them said, “He is driving out demons using the power of Beelzebub, the ruler of demons.” Others were trying to test Jesus by demanding a miraculous sign from heaven. Jesus knew what they were thinking and said, “Any kingdom divided against itself will collapse. A family divided against itself will fall. If Satan is divided against himself, how can his kingdom stand? You say that I cast out demons using the power of Beelzebub.",
    "bible": "Free Bible Version"
  },
  ...
]

```
#### POST /api/passages/ 
ONLY REGISTERED USERS: Save a favourite passage
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
  "message": "Passage added as favourite",
  "body": {
    "isRandom": false,
    "_id": "609e2bc9d1b9c66ce48fdd92",
    "content": "“Sir,” replied the woman, “Please give me this water so I won't be thirsty, and I won't have to come here to fetch water!” “Go and call your husband, and come back here,” Jesus told her. “I don't have a husband,” the woman answered.“You're right in saying you don't have a husband,” Jesus told her.",
    "reference": "John 4:15-17",
    "bible": "Free Bible Version",
    "language": "",
    "user": "",
    "__v": 0
  }
}
```
#### DELETE /api/passages/:id 
ONLY REGISTERED USERS: Delete a favourite passage
> Output
```json
{
    "message": "Passage is no longer a favourite"
}
```

### Random passages
XXXXXXXXXXXXX

#### GET /api/passages/random
Return a random passage saved by admin - english or spanish
> Body
```json
{
  "reference": "John 3:4-5",
  "content": "“How can you be reborn when you're old?” Nicodemus asked. “You can't go back into your mother's womb and be born a second time!” “I tell you the truth, you can't enter God's kingdom unless you are born of water and the Spirit,” Jesus told him.",
  "bible": "Free Bible Version"
}
```
> Output
```json
{
  "message": "Random passage created",
  "body": {
    "isRandom": true,
    "_id": "60a0dca618096e5bc8f2229f",
    "content": "“How can you be reborn when you're old?” Nicodemus asked. “You can't go back into your mother's womb and be born a second time!” “I tell you the truth, you can't enter God's kingdom unless you are born of water and the Spirit,” Jesus told him.",
    "reference": "John 3:4-5",
    "bible": "Free Bible Version",
    "language": "",
    "user": "",
    "__v": 0
  }
}
```

#### POST /api/passages/ random
Return the results of comparing the Bible text with the written by the user
> Body
```json
{
}
```
> Output
```json
{
}
```