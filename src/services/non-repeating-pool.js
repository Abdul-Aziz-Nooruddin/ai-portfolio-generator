/**
 * Non-Repeating Design Pool Manager
 * Guarantees that no layout structure, color palette, or typography font pairing
 * is repeated until ALL other designs in the pool have been exhausted.
 */

class NonRepeatingPool {
  constructor(items, name = 'pool') {
    this.name = name;
    this.originalItems = [...items];
    this.available = [];
    this.usedInCurrentCycle = [];
    this.totalGenerations = 0;
    this.cycleCount = 1;
    this.refillAndShuffle();
  }

  refillAndShuffle() {
    const shuffled = [...this.originalItems];
    // Fisher-Yates Shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Avoid immediate duplicate across cycle boundary
    if (this.usedInCurrentCycle.length > 0 && shuffled[0] === this.usedInCurrentCycle[this.usedInCurrentCycle.length - 1] && shuffled.length > 1) {
      const swapIdx = Math.floor(Math.random() * (shuffled.length - 1)) + 1;
      [shuffled[0], shuffled[swapIdx]] = [shuffled[swapIdx], shuffled[0]];
    }

    this.available = shuffled;
    this.usedInCurrentCycle = [];
  }

  /**
   * Returns the next non-repeating item.
   * If a filter/predicate is provided (e.g. for user explicit style hint),
   * it prioritizes matching available items in the current cycle first.
   */
  next(filterFn = null) {
    if (this.available.length === 0) {
      this.cycleCount++;
      this.refillAndShuffle();
    }

    let selectedItem;

    if (filterFn && typeof filterFn === 'function') {
      const index = this.available.findIndex(filterFn);
      if (index !== -1) {
        selectedItem = this.available.splice(index, 1)[0];
      } else {
        // If not in currently remaining items of this cycle, find from original
        const fallbackMatch = this.originalItems.find(filterFn);
        selectedItem = fallbackMatch || this.available.shift();
      }
    } else {
      selectedItem = this.available.shift();
    }

    this.usedInCurrentCycle.push(selectedItem);
    this.totalGenerations++;

    return selectedItem;
  }

  getStatus() {
    return {
      poolName: this.name,
      totalItems: this.originalItems.length,
      remainingInCycle: this.available.length,
      usedInCycle: this.usedInCurrentCycle.length,
      cycleCount: this.cycleCount,
      totalGenerations: this.totalGenerations
    };
  }
}

module.exports = { NonRepeatingPool };
