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
  "verseRange": "PSA.60.2-PSA.60.4", // Not used on client
  "reference": "Salmos 60:2-4",
  "content": "Hiciste temblar la tierra, abrístela: Sana sus quiebras, porque titubea. Has hecho ver á tu pueblo duras cosas: Hicístenos beber el vino de agitación. en medio de muchos peligros. “En Dios está acallada mi alma.” Has dado á los que te temen banderaQue alcen por la verdad. (Selah.)",
  "copyright": "Reina-Valera 1909 - Dominio público. Fue realizada por Sociedades Bíblicas Unidas y publicada por primera vez en 1909.",
  "bible": "Reina Valera 1909"
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