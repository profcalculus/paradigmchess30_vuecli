import Chess from '../tests/chess_modified.mjs';

export default class ChessP30 {
  constructor () {
    Object.setPrototypeOf (this, Chess ());
    // this.attacked = this.attacked ();
    this.result = {
      result: '*',
      reason: 'playing',
    };
  } // end constructor

  fen_p30 () {
    return this.generate_fen ().replace (/b/g, 'd').replace (/B/g, 'D');
  }

  load (fen, keep_headers) {
    if (typeof fen === 'undefined') {
      fen = this.random_p30_start_fen ();
    } else if (fen.length === 5) {
      fen = this.p30_fen_from_perm (fen);
    }
    return super.load (fen, keep_headers);
  }

  //p30
  /* Generate a random start position according to the Paradigm30 rules:
  * Kings and rooks on their standard squares, all other major pieces randomly
  * scrambled among the remaining spaces on the first/last rank. Ordering of the white
  * pieces must match that of the black pieces.
  \*/
  p30_fen_from_perm (perm) {
    let bpos = 'r' + perm.slice (0, 3) + 'k' + perm.slice (3, 6) + 'r';
    let wpos = bpos.toUpperCase ();
    const fen =
      bpos + '/pppppppp/' + '8/8/8/8' + '/PPPPPPPP/' + wpos + ' w KQkq - 0 1';
    return fen;
  }
  random_p30_start_fen () {
    let index = Math.floor (Math.random () * 30); // 0 <= index < 30
    let perm = this.PERMS[index];
    return this.p30_fen_from_perm (perm);
  }

  onResult (result) {
    console.log (`onResult() called: ${result}`);
    // Hook for external event handler
  }

  legal_dragon_bishop_move (fromsq, tosq) {
    /* p30: if the candidate attacker is a DB moving like a knight, we need to;
            check for a piece on the 'blocking square' \*/
    let delta = fromsq - tosq;
    let blocking_offset = null;
    switch (delta) {
      case -33:
      case -31:
        blocking_offset = +16;
        break;
      case -18:
      case +14:
        blocking_offset = +1;
        break;
      case -14:
      case +18:
        blocking_offset = -1;
        break;
      case +33:
      case +31:
        blocking_offset = -16;
        break;
    }
    if (blocking_offset) {
      let blocking_square = fromsq + blocking_offset;
      if (this.board[blocking_square] == null) {
        return true;
      }
    }
    return false;
  }

  set_result (result, reason) {
    this.result.result = result;
    this.result.reason = reason;
    this.chess.header.Result = result;
    this.onResult (this.result);
  }
  attacked (color, square) {
    // Does any [color] piece attack [square]?
    for (let i = this.chess.SQUARES.a8; i <= this.chess.SQUARES.h1; i++) {
      /* did we run off the end of the board \*/
      if (i & 0x88) {
        i += 7;
        continue;
      }

      /* if empty square or wrong color \*/
      if (this.board[i] == null || this.board[i].color !== color) continue;

      let piece = this.board[i];
      let difference = i - square;
      let index = difference + 119;

      if (this.ATTACKS[index] & (1 << this.SHIFTS[piece.type])) {
        if (piece.type === this.PAWN) {
          if (difference > 0) {
            if (piece.color === this.WHITE) return true;
          } else {
            if (piece.color === this.BLACK) return true;
          }
          continue;
        }

        /* if the piece is a knight or a king \*/
        if (piece.type === 'n' || piece.type === 'k') return true;
        if (piece.type === 'b') {
          if (this.legal_dragon_bishop_move (i, square)) {
            return true;
          }
          let blocking_offset = null;
          switch (difference) {
            case -33:
            case -31:
              blocking_offset = +16;
              break;
            case -18:
            case +14:
              blocking_offset = +1;
              break;
            case -14:
            case +18:
              blocking_offset = -1;
              break;
            case +33:
            case +31:
              blocking_offset = -16;
              break;
          }
          if (blocking_offset) {
            let blocking_square = i + blocking_offset;
            if (this.board[blocking_square] == null) {
              return true;
            }
          }
        }

        let offset = this.RAYS[index];
        let j = i + offset;

        let blocked = false;
        while (j !== square) {
          if (this.board[j] != null) {
            blocked = true;
            break;
          }
          j += offset;
        }

        if (!blocked) return true;
      }
    }

    return false;
  }
} // end export


// Tests

let t = new ChessP30 ();
let proto = Object.getPrototypeOf (t);
console.log (`t = ${t}`);
console.log (`proto = ${proto}`);
console.log (`ATTACKS = ${t.ATTACKS}`);
console.log (t.fen ());
t.load ('rnnqkbbr/pppppppp/8/8/8/8/PPPPPPPP/RNNQKBBR w KQkq - 0 1');
console.log (t.fen ());
// console.log (t.fen_p30 ());
console.log (t.ascii ());
for (let m of ['f4', 'c5', 'g4', 'b6']) {
  console.log (t.move (m));
  console.log (t.ascii ());
}
console.log (t.move ('Bg3'));
console.log (t.ascii ());

console.log (t.pgn ());
