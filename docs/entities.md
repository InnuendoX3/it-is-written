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
  "id": "JHN.14.15",
  "reference": "John 14:15",
  "content": "If you love me, you will keep my commands.",
  "copyright": "Dr. Jonathan Gallagher. Released under Creative Commons Attribution-ShareAlike 4.0 Unported License. Version 3.1 beta. For corrections send email to jonathangallagherfbv@gmail.com",
  "bible": "Free Bible Version"
}
```

### A Passage
```json
{
  "isRandom": true,
  "_id": "60a0dca618096e5bc8f2229f",
  "content": "“How can you be reborn when you're old?” Nicodemus asked. “You can't go back into your mother's womb and be born a second time!” “I tell you the truth, you can't enter God's kingdom unless you are born of water and the Spirit,” Jesus told him.",
  "reference": "John 3:4-5",
  "bible": "Free Bible Version",
  "language": 1, // 1=English, 2=Spanish
  "user": "",
  "__v": 0
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