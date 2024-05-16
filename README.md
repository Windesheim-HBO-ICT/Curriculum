# Gebruik van Curriculum (Webcomponent)

Dit component is een webcomponent dat het huidige curriculum weergeeft van Hogeschool Windesheim. Het biedt een navigatie manier aan waarmee studenten door verschillende curriculumonderdelen kunnen bladeren en op een overzichtelijke manier toegang hebben tot relevante informatie.

## Integratie

1. **Importeer het component script**: Voeg het script voor het Curriculum Component toe aan je HTML-bestand met behulp van de `<script>` tag en het `type="module"` attribuut.

   ```html
   <script src="/components/curriculum-component.js" type="module"></script>
   ```

2. **Voeg het component toe aan je pagina**: Plaats de `<curriculum-component>` tag in het body-gedeelte van je HTML-bestand om het Curriculum Component op je webpagina weer te geven.

   ```html
   <curriculum-component></curriculum-component>
   ```

3. **Voeg de stylesheet toe**: Vergeet niet om de bijbehorende stylesheet toe te voegen aan je HTML-bestand om de juiste stijl toe te passen op het Curriculum Component.

   ```html
   <link rel="stylesheet" href="/css/style.css" s />
   ```

## Aanpassingen

Het Curriculum Component kan worden aangepast aan de hand van je specifieke curriculumdata. Zorg ervoor dat je de juiste curriculumdata definieert en doorgeeft aan het component om de navigatiebalk correct te laten werken.

## Voorbeeld

Hieronder vind je een eenvoudig voorbeeld van een HTML-bestand met het Curriculum Component geïntegreerd:

```html
<!DOCTYPE html>
<html lang="nl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="/components/curriculum-component.js" type="module"></script>
    <link rel="stylesheet" href="/css/style.css" />
    <title>Curriculum Navigatiebalk - Hogeschool Windesheim</title>
  </head>
  <body>
    <curriculum-component></curriculum-component>
  </body>
</html>
```
