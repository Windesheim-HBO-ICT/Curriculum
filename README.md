# HBO-ICT Curriculum Web Component

Dit webcomponent geeft het curriculum weer van HBO-ICT Windesheim. Het maakt gebruik van een gestructureerd JSON-bestand om de inhoud weer te geven. Door dit component te integreren in je HTML-bestand, kun je eenvoudig het curriculum bekijken.

## Integratie

1. **Importeer het component script:** Voeg het script voor het Curriculum Component toe aan je HTML-bestand met behulp van de `<script>` tag en het type="module" attribuut.

    ```html<script src="https://cdn.jsdelivr.net/gh/Windesheim-HBO-ICT/Curriculum/components/curriculum-component.js" type="module"></script>```

2. **Voeg de stylesheet toe:** Voeg de bijbehorende stylesheet toe aan je HTML-bestand om de juiste stijl toe te passen op het Curriculum Component.

 ```html<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Windesheim-HBO-ICT/Curriculum/css/style.css" />```

3. **Voeg het component toe aan je pagina:** Plaats de `<curriculum-component>` tag in het body-gedeelte van je HTML-bestand om het Curriculum Component op je webpagina weer te geven.

   ```javascript
   <curriculum-component
     software-resource="https://raw.githubusercontent.com/voorbeeld/voorbeeld.software.json"
     infrastructuur-resource="https://raw.githubusercontent.com/voorbeeld/voorbeeld.infrastructuur.json"
     organisatieprocessen-resource="https://raw.githubusercontent.com/voorbeeld/voorbeeld.organisatieprocessen.json"
     hardwareinterfacing-resource="https://raw.githubusercontent.com/voorbeeld/voorbeeld.hardwareinterfacing.json"
     gebruikersinteractie-resource="https://raw.githubusercontent.com/voorbeeld/voorbeeld.gebruikersinteractie.json"
   ></curriculum-component>
   ```

Voor een live voorbeeld van de werking van dit component, zie index.html.

## Attributen

- **software-resource:** De URL naar het JSON-bestand dat de informatie over softwareontwikkeling bevat.
- **infrastructuur-resource:** De URL naar het JSON-bestand dat de informatie over infrastructuur bevat.
- **organisatieprocessen-resource:** De URL naar het JSON-bestand dat de informatie over organisatieprocessen bevat.
- **hardwareinterfacing-resource:** De URL naar het JSON-bestand dat de informatie over hardware-interfacing bevat.
- **gebruikersinteractie-resource:** De URL naar het JSON-bestand dat de informatie over gebruikersinteractie bevat.

**Let op:** De attributen zijn niet verplicht, maar je hebt er minstens één nodig. De volgorde waarin je de attributen plaatst, bepaalt welke inhoud als eerste wordt weergegeven bij het laden van de pagina.

## JSON-bestand format

De structuur begint met een SSDLC-fase, die één of meerdere HBO-I-activiteiten omvat. Binnen elke activiteit worden verschillende vaardigheden genoemd. Deze vaardigheden kunnen verder onderverdeeld worden in meer specifieke vaardigheden. Optioneel kan elke vaardigheid een link bevatten naar een externe bron voor extra informatie wanneer erop geklikt wordt.

```JSON
[
  {
    "naam": "SSDLC Fase",
    "activiteiten": [
      {
        "naam": "HBO-I Activiteit",
        "vaardigheden": [
          {
            "naam": "Vaardigheid 1",
            "link": "https://voorbeeldlink.com"
          },
          {
            "naam": "Vaardigheid 2",
            "vaardigheden": [
              {
                "naam": "Subvaardigheid 1",
                "vaardigheden": [
                  { "naam": "Subsubvaardigheid 1" },
                  { "naam": "Subsubvaardigheid 2" }
                ]
              },
              { "naam": "Subvaardigheid 2" }
            ]
          },
          // Andere vaardigheden...
        ]
      },
      // Andere activiteiten...
    ]
  },
  // Andere fases...
]


```
