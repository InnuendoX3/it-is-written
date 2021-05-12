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
  "id": "LUK.11.15-LUK.11.18",
  "reference": "Luke 11:15-18",
  "content": "But some of them said, “He is driving out demons using the power of Beelzebub, the ruler of demons.” Others were trying to test Jesus by demanding a miraculous sign from heaven. Jesus knew what they were thinking and said, “Any kingdom divided against itself will collapse. A family divided against itself will fall. If Satan is divided against himself, how can his kingdom stand? You say that I cast out demons using the power of Beelzebub.",
  "copyright": "Dr. Jonathan Gallagher. Released under Creative Commons Attribution-ShareAlike 4.0 Unported License. Version 3.1 beta. For corrections send email to jonathangallagherfbv@gmail.com",
  "bible": "Free Bible Version"
}
```

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
