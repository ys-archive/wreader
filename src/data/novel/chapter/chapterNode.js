class ChapterNode {
  static nodeIdx = 0;

  constructor(amount = 0, isHead = false) {
    this.idx = ChapterNode.nodeIdx++;
    this.prev = null;
    this.next = null;

    if (isHead) {
      this.populateChapterNodes(amount);
    }
  }

  populateChapterNodes(amount) {
    let temp = new ChapterNode(false);
    this.next = temp;

    let chapter = undefined;

    for (let i = 0; i < amount; ++i) {
      chapter = new Chapter();
      temp.next = chapter;
      chapter.prev = temp;
      temp = chapter;
    }
  }
}

export default ChapterNode;
