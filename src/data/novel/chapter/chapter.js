import { isInstanceOfExcept, isTypeOfExcept } from '#utils';
// import Candidate from './candidate';
import NewCandidate from './newCandidate';

class Chapter {
  constructor(amount = 10) {
    this._candidates = [];
  }

  addNewCandidate(newCandidate) {
    isInstanceOfExcept(newCandidate, NewCandidate);
    this._candidates.push(newCandidate);
  }

  removeCandidateById(id) {
    isTypeOfExcept(id, 'string');
    this._candidates.filter(candidate => candidate.id !== id);
  }

  getCurrentChapter() {
    return this._node;
  }
}

export default Chapter;
