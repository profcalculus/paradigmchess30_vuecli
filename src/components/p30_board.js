// p30_board.js
// Integration of chessboard.js with chess_p30.js
import $ from 'jquery';
window.$ = $;

import Chessboard from 'chessboardjs';
import ChessP30 from '../libs/chess_p30.mjs';
import EventBus from '../event-bus.js';
// import ('../chessboard.css');

const CONFIG = {
  pieceTheme: './src/assets/img/chesspieces/paradigm30/{piece}.png',
  position: 'start',
  showNotation: false,
  draggable: true,
  moveSpeed: 1,
  snapBackSpeed: 1,
  snapSpeed: 1,
  trashSpeed: 1,
};

export class P30Board {
  // board_id must be the ID of a DOM node
  constructor (game_id, board_id, white, black, orientation) {
    this.game_id = game_id;
    this.game = new ChessP30 ();
    this.white = white;
    this.black = black;
    this.config = Object.assign (CONFIG);
    this.config.onDragStart = this.onDragStart;
    this.config.onDrop = this.onDrop;
    this.config.onSnapEnd = this.onSnapEnd;
    this.config.orientation = orientation;
    this.board = Chessboard (board_id, this.config);
    // TBD: Hacky way of making these objects available in the event handlers
    this.config.p30 = this;
    // this.promoting = false;
    this.moveNumber = 1;
    this.current_san = '';
    this.promotion_piece = '';
    this.result = '*';
    this.refresh ();
  }

  onDragStart (source, piece, position, orientation) {
    // do not pick up pieces if the game is over
    let game = this.p30.game;
    if (game.game_over ()) return false;

    // only pick up pieces for the side to move
    if (
      (game.turn () === 'w' && piece.search (/^b/) !== -1) ||
      (game.turn () === 'b' && piece.search (/^w/) !== -1)
    ) {
      return false;
    }
  }

  refresh () {
    this.board.position (this.game.fen (), false); // No animation
  }
  newGame (game_id, white, black, fen, orientation = 'white') {
    console.log (
      `newGame ${game_id} ${white}-${black} created: FEN=${fen}, orientation = ${orientation}`
    );
    this.game = new ChessP30 (fen);
    this.moveNumber = 1;
    this.current_san = '';
    this.board.orientation = orientation;
    this.white = white;
    this.black = black;
    this.board.doPromotion = this.doPromotion;
    // updateStatus();
    // pgnHeader();
    this.refresh ();
    return this.game;
  }

  onDrop (source, target) {
    let game = this.p30.game;
    let move_cfg = {
      turn: game.turn (),
      from: source,
      to: target,
      promotion: 'q',
    };
    // check we are not trying to make an illegal pawn move to the 8th or 1st rank,
    // so the promotion dialog doesn't pop up unnecessarily
    // e.g. (p)d7-f8
    let move = game.move (move_cfg);
    // illegal move
    if (move === null) {
      return 'snapback';
    } else {
      game.undo (); //move is ok, now we can go ahead and check for promotion
    }

    // is it a promotion?
    let source_rank = source.substring (2, 1);
    let target_rank = target.substring (2, 1);
    let piece = game.get (source).type;

    if (
      piece === 'p' &&
      ((source_rank === '7' && target_rank === '8') ||
        (source_rank === '2' && target_rank === '1'))
    ) {
      this.p30._doPromotion (move_cfg);
    } else {
      // no promotion, go ahead and move
      move = this.p30.makeMove (move_cfg);
    }
    // updateStatus (move);
  }

  load (fen) {
    fen = this.game.load (fen);
    this.board.position (fen);
  }

  makeMove (move_cfg) {
    // see if the move is legal
    let move = this.game.move (move_cfg);
    // illegal move
    if (move === null) return 'snapback';
    this.updateBoard ();
    EventBus.$emit ('move', {
      game_id: this.game_id,
      move: move_cfg,
      fen: this.game.fen,
    });
    return move;
  }

  updateBoard () {
    this.board.position (this.game.fen (), false);
    // updateStatus (move);
  }

  // onDialogClose () {
  //   move_cfg.promotion = promote_to;
  //   let move = makeMove (move_cfg);
  //   updateBoard ();
  //   this.promoting = false;
  // }

  onSnapEnd () {
    //if promoting we need to select the piece first
    if (this.p30.promoting) return;
    this.p30.board.position (this.p30.game.fen ());
  }

  _getImgSrc (piece) {
    return CONFIG.pieceTheme.replace (
      '{piece}',
      this.game.turn () + piece.toLocaleUpperCase ()
    );
  }

  get turn () {
    return this.game.turn ();
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

  resign (player) {
    this.game.setResult (player == 'white' ? '0-1' : '1-0', 'resignation');
  }
  timeloss (player) {
    this.game.set_result (player == 'white' ? '0-1' : '1-0', 'time');
  }
  draw_agreed () {
    this.game.set_result ('1/2', 'agreed');
  }

  handleResult (result) {
    EventBus.$emit ('game_result', {
      game_id: this.game_id,
      white: this.white,
      black: this.black,
      result: result,
    });
  }

  _doPromotion (move_cfg) {
    // hook for external handler
  }
}
// _doPromotion (move_cfg) {
//   this.promoting = true;

//   // get piece images
//   $ ('.promotion-piece-q').attr ('src', this._getImgSrc ('q'));
//   $ ('.promotion-piece-r').attr ('src', this._getImgSrc ('r'));
//   $ ('.promotion-piece-n').attr ('src', this._getImgSrc ('n'));
//   $ ('.promotion-piece-b').attr ('src', this._getImgSrc ('b'));

//   //show the select piece to promote to dialog
//   promotion_dialog
//     .dialog ({
//       modal: true,
//       height: 46,
//       width: 184,
//       resizable: true,
//       draggable: false,
//       close: this.onDialogClose,
//       closeOnEscape: false,
//       dialogClass: 'noTitleStuff',
//     })
//     .dialog ('widget')
//     .position ({
//       of: $ ('#board'),
//       my: 'middle middle',
//       at: 'middle middle',
//     });
//   //the actual move is made after the piece to promote to
//   //has been selected, in the stop event of the promotion piece selectable
//   return;
// }

// _choose_promotion (color) {
//   $ ('#promotion-popup').dialog ({
//     modal: true,
//   });
//   return $ ("input[name='promo']:checked").val ();
// }

// console.log ('Start chessboard init');

// this.board = Chessboard ('myBoard', config);
// this.game = newGame ();
// // Since we're all loaded, reveal the html
// $ ('body').css ('display', 'initial');
// console.log ('End chessboard init');

// // init promotion piece dialog
// $ ('#promote-to').selectable ({
//   stop: function () {
//     $ ('.ui-selected', this).each (function () {
//       let selectable = $ ('#promote-to li');
//       let index = selectable.index (this);
//       if (index > -1) {
//         let promote_to_html = selectable[index].innerHTML;
//         let span = $ ('<div>' + promote_to_html + '</div>').find ('span');
//         let promote_to = span[0].innerHTML;
//       }
//       promotion_dialog.dialog ('close');
//       $ ('.ui-selectee').removeClass ('ui-selected');
//     });
//   },
// });
