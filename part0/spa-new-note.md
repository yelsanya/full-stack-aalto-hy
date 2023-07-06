```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: The browser redraws notes with new note using redrawNotes function from spa.js
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note left of server: The server adds new note to the database 
    server-->>browser: {"message":"note created"}
    deactivate server
```