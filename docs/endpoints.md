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
  "bible": {
    "abbreviation": "RVR09",
    "name": "Reina Valera 1909"
  },
  "verse": {
    "id": "PSA.119.15",
    "reference": "Salmos 119:15",
    "content": "<p class=\"q\"><span data-number=\"15\" data-sid=\"PSA 119:15\" class=\"v\">15</span>En tus mandamientos meditaré,</p><p data-vid=\"PSA 119:15\" class=\"q\">Consideraré tus caminos.</p>",
    "copyright": "\n          Reina-Valera 1909 - Dominio público.\n          Fue realizada por Sociedades Bíblicas Unidas y publicada por primera vez en 1909.\n        "
  }
}
```

#### GET /api/bibles/:bibleAbbr/passages/:passageRange
Return a passage.
Passage is the text between two verses.
*passageRange* is composed by two verses. Ex: *LUK.11.15-LUK.11.18*
> Output
```json
{
  "bible": {
    "abbreviation": "FBV",
    "name": "Free Bible Version"
  },
  "passage": {
    "id": "LUK.11.15-LUK.11.18",
    "reference": "Luke 11:15-18",
    "content": "<p class=\"p\"><span data-number=\"15\" data-sid=\"LUK 11:15\" class=\"v\">15</span>But some of them said, “He is driving out demons using the power of Beelzebub, the ruler of demons.” <span data-number=\"16\" data-sid=\"LUK 11:16\" class=\"v\">16</span>Others were trying to test Jesus by demanding a miraculous sign from heaven.</p><p class=\"p\"><span data-number=\"17\" data-sid=\"LUK 11:17\" class=\"v\">17</span>Jesus knew what they were thinking and said, “Any kingdom divided against itself will collapse. A family divided against itself will fall. <span data-number=\"18\" data-sid=\"LUK 11:18\" class=\"v\">18</span>If Satan is divided against himself, how can his kingdom stand? You say that I cast out demons using the power of Beelzebub. </p>",
    "contentPlainText": "But some of them said, “He is driving out demons using the power of Beelzebub, the ruler of demons.” Others were trying to test Jesus by demanding a miraculous sign from heaven. Jesus knew what they were thinking and said, “Any kingdom divided against itself will collapse. A family divided against itself will fall. If Satan is divided against himself, how can his kingdom stand? You say that I cast out demons using the power of Beelzebub.",
    "copyright": "Dr. Jonathan Gallagher. Released under Creative Commons Attribution-ShareAlike 4.0 Unported License. Version 3.1 beta. For corrections send email to jonathangallagherfbv@gmail.com"
  }
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
