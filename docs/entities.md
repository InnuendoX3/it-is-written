## Entities
### Bible
```json
{
  "abbreviation": "KJV",
  "name": "King James Version",
  "language": "English"
}
```

### Bible Book
```json
{
  "id": "GEN",
  "name": "Genesis"
}
```

### Book Chapter
```json
{
  "id": "EXO.6",
  "bookId": "EXO",
  "number": "6",
  "reference": "Exodus 6"
}
```

### Chapter Verse
```json
{
  "id": "DEU.16.3",
  "reference": "Deuteronomy 16:3",
  "number": "3"
}
```

### A single Verse
```json
{
  "id": "PSA.119.15",
  "reference": "Salmos 119:15",
  "content": "<p class=\"q\"><span data-number=\"15\" data-sid=\"PSA 119:15\" class=\"v\">15</span>En tus mandamientos meditaré,</p><p data-vid=\"PSA 119:15\" class=\"q\">Consideraré tus caminos.</p>",
  "copyright": "\n          Reina-Valera 1909 - Dominio público.\n          Fue realizada por Sociedades Bíblicas Unidas y publicada por primera vez en 1909.\n        "
}
```

### A Passage
```json
{
  "id": "LUK.11.15-LUK.11.18",
  "reference": "Luke 11:15-18",
  "content": "But some of them said, “He is driving out demons using the power of Beelzebub, the ruler of demons.” Others were trying to test Jesus by demanding a miraculous sign from heaven. Jesus knew what they were thinking and said, “Any kingdom divided against itself will collapse. A family divided against itself will fall. If Satan is divided against himself, how can his kingdom stand? You say that I cast out demons using the power of Beelzebub.",
  "copyright": "Dr. Jonathan Gallagher. Released under Creative Commons Attribution-ShareAlike 4.0 Unported License. Version 3.1 beta. For corrections send email to jonathangallagherfbv@gmail.com"
}
```

### A Diff
```json
{
  "differences": [
    {
      "count": 4,
      "value": [
        "Jesus",
        "said",
        "to",
        "his"
      ]
    },
    {
      "count": 1,
      "removed": true,
      "value": [
        "disciples:"
      ]
    },
    {
      "count": 1,
      "added": true,
      "value": [
        "people:"
      ]
    },
    {
      "count": 10,
      "value": [
        "If",
        "you",
        "love",
        "me,",
        "you",
        "will",
        "do",
        "as",
        "I",
        "command."
      ]
    }
  ],
  "percentage": 94,
  "bibleTextWordsQty": 15,
  "matchedWords": 14
}
```