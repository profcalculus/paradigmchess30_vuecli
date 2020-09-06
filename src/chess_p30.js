/* esversion:6 */
import Chess from 'chess.js';
import assert from 'assert';

ChessP30.prototype = Object.create (Chess.prototype, {
  PIECE_OFFSETS: {
    n: [-18, -33, -31, -14, 18, 33, 31, 14],
    //b: [-17, -15, 17, 15],
    //p30: dragon-bishop!
    b: [-17, -15, 17, 15, -18, -33, -31, -14, 18, 33, 31, 14],
    r: [-16, 1, 16, -1],
    q: [-17, -16, -15, 1, 17, 16, 15, -1],
    k: [-17, -16, -15, 1, 17, 16, 15, -1],
  },

  // P30: List all the distinct permutations of the 'relocatable' pieces (bbnnq) for the initial
  // position of a p30 game. There are 5!/(2! 2!) = 30 of these.
  // prettier-ignore
  PERMS: [
    'bbnnq', 'bbnqn', 'bbqnn', 'bnbnq', 'bnbqn', 'bnnbq',
    'bnnqb', 'bnqbn', 'bnqnb', 'bqbnn', 'bqnbn', 'bqnnb',
    'nbbnq', 'nbbqn', 'nbnbq', 'nbnqb', 'nbqbn', 'nbqnb',
    'nnbbq', 'nnbqb', 'nnqbb', 'nqbbn', 'nqbnb', 'nqnbb',
    'qbbnn', 'qbnbn', 'qbnnb', 'qnbbn', 'qnbnb', 'qnnbb'],

  start_fen (fen) {
    /* 
      if the user passes in a fen string or a 5-character FEN code,
      (a PERM) load it, else default to a random P30 starting position
    */
    if (fen === undefined) {
      index = Math.floor (Math.random () * 30); // 0 <= index < 30;
      fen = PERMS[index]; // 5 chars only
    }
    if (length (fen) === 5) {
      bpos = 'r' + fen.slice (0, 3) + 'k' + fen.slice (3, 6) + 'r';
      wpos = bpos.toUpperCase ();
      FEN =
        bpos + '/pppppppp/' + '8/8/8/8' + '/PPPPPPPP/' + wpos + ' w KQkq - 0 1';
    }
    assert (length (fen) === 56); // Length of a *starting* FEN
    return fen;
  },

  reset () {
    fen = start_fen ();
    load (fen);
  },

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
      if (board[blocking_square] == null) {
        return true;
      }
    }
    return false;
  },

  // prettier-ignore
  ATTACKS: [
    20,   0,    0,    0,    0,    0,    0,   24,   0,    0,    0,    0,    0,    0,   20,  0,
     0,  20,    0,    0,    0,    0,    0,   24,   0,    0,    0,    0,    0,   20,    0,  0,
     0,   0,   20,    0,    0,    0,    0,   24,   0,    0,    0,    0,   20,    0,    0,  0,
     0,   0,    0,   20,    0,    0,    0,   24,   0,    0,    0,   20,    0,    0,    0,  0,
     0,   0,    0,    0,   20,    0,    0,   24,   0,    0,   20,    0,    0,    0,    0,  0,
     0,   0,    0,    0,    0,   20,    6,   24,   6,   20,    0,    0,    0,    0,    0,  0,
     0,   0,    0,    0,    0,    6,   53,   56,  53,    6,    0,    0,    0,    0,    0,  0,
    24,  24,   24,   24,   24,   24,   56,    0,  56,   24,   24,   24,   24,   24,   24,  0,
     0,   0,    0,    0,    0,    6,   53,   56,  53,    6,    0,    0,    0,    0,    0,  0,
     0,   0,    0,    0,    0,   20,    6,   24,   6,   20,    0,    0,    0,    0,    0,  0,
     0,   0,    0,    0,   20,    0,    0,   24,   0,    0,   20,    0,    0,    0,    0,  0,
     0,   0,    0,   20,    0,    0,    0,   24,   0,    0,    0,   20,    0,    0,    0,  0,
     0,   0,   20,    0,    0,    0,    0,   24,   0,    0,    0,    0,   20,    0,    0,  0,
     0,  20,    0,    0,    0,    0,    0,   24,   0,    0,    0,    0,    0,   20,    0,  0,
    20,   0,    0,    0,    0,    0,    0,   24,   0,    0,    0,    0,    0,    0,   20,  ],

  insufficient_material () {
    // Override insufficient_material() from chess.js: 1 DB can mate!
    let num_pieces = 0;
    let num_knights = 0;

    for (let i = SQUARES.a8; i <= SQUARES.h1; i++) {
      if (i & 0x88) {
        i += 7;
        continue;
      }
      let piece = board[i];
      if (piece) {
        num_pieces++;
        if (piece.type === KNIGHT) {
          num_knights++;
        }
      }
    }
    /* k vs. k */
    if (num_pieces === 2) {
      return true;
    } else if (
      /* k vs. kn */
      num_pieces === 3 &&
      num_knights === 1
    ) {
      return true;
    }
    return false;
  },

  fen_p30 () {
    // Return the FEN string with 'dD' instead of 'bB'.;
    // For display purposes only. Internally we keep the standard FEN symbols!;
    return generate_fen ().replace (/b/g, 'd').replace (/B/g, 'D');
  },
});
