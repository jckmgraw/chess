# Chess by Jack McGraw

I like to play chess. I am trying to build a vastly simplified [chess.com](https://www.chess.com/) for fun. You can try it out [here](https://chess-by-jack-mcgraw.herokuapp.com/), but there's still a lot to do...

### TODO (unordered)

- [server](https://github.com/jckmgraw/chess-server)
- server-side invite expiration countdown
- TypeScript
- En Passant, pawn upgrade knight option
- stalemate, draw, resign, offer draw
- basic game analytics
- handle server connection issues
- client side caching
- add option to move piece by clicking instead of dragging
- make it look nice
  - CSS in lobby is terrible when players exceed window height / width
  - nav buttons: close out of game, back to username screen
  - display available moves when piece is selected
  - simple how to play popup (link to google)
  - max length for username
  - display pieces taken
  - ...
- mobile version
- user login, stats, etc.
- game timer
- socket.io security
- ...

#### Known Bugs

- "impossible piece capture"
  - p1 has piece X selected
  - p2 captures X
  - p1 retains X
- sync issues with invites
