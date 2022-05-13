# Notepad

This project was generated with Angular version 13.1.2, for the styles I used the library Angular Material version 13.3.7, and for the backend I use the library Angular Fire version 7.3.0 to comunicate with firebase.


## Description

For this project we can signin with a mail or use an google account, once in the notepad we can create, archive, unarchive and delete notes, and signout. 

For notes I generated an model interface with the followin properties:
`id, title, description, date, archived`

To consume the firebase functions I create a service `api.service.ts`, where these functions are imported and used, most of them return a promise, so to avoid the asyncronity I use `async / await`, and the other functions return an observable.

From UI Kit I use the `toolbar, icon, button, input, card, dialog and snackbar` componets.
