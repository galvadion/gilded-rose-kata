const MAX_QUALITY = 50;
const MIN_QUALITY = 0;
const BACKSTAGE_PASS_THRESHOLD_1 = 11;
const BACKSTAGE_PASS_THRESHOLD_2 = 6;
const CONJURED_QUALITY_DEGRADE_FACTOR = 2;

export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        const items: Item[] = this.items;
        for (let i = 0; i < items.length; i++) {
            const behavior = getItemBehavior(items[i]);
            behavior.updateQuality(items[i]);
        }
        return items
    }
}

interface ItemBehavior {
    updateQuality(item: Item): void;
}

class NormalItem implements ItemBehavior {
    updateQuality(item: Item) {
        if (item.quality > MIN_QUALITY) {
            item.quality = item.quality - 1;
        }

        item.sellIn = item.sellIn - 1;

        if (item.sellIn < 0) {
            if (item.quality > MIN_QUALITY) {
                item.quality = item.quality - 1;
            }
        }
    }
}

class AgedBrie implements ItemBehavior {
    updateQuality(item: Item) {
        if (item.quality < MAX_QUALITY) {
            item.quality = item.quality + 1;
        }

        item.sellIn = item.sellIn - 1;

        if (item.sellIn < 0 && item.quality < MAX_QUALITY) {
            item.quality = item.quality + 1;
        }
    }
}

class BackstagePasses implements ItemBehavior {
    updateQuality(item: Item) {
        if (item.quality < MAX_QUALITY) {
            item.quality = item.quality + 1;

            if (item.sellIn < BACKSTAGE_PASS_THRESHOLD_1 && item.quality < MAX_QUALITY) {
                item.quality = item.quality + 1;
            }

            if (item.sellIn < BACKSTAGE_PASS_THRESHOLD_2 && item.quality < MAX_QUALITY) {
                item.quality = item.quality + 1;
            }
        }

        item.sellIn = item.sellIn - 1;

        if (item.sellIn < 0) {
            item.quality = MIN_QUALITY;
        }
    }
}

class Sulfuras implements ItemBehavior {
    updateQuality(item: Item) {
        // "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
    }
}

class Conjured implements ItemBehavior {
    updateQuality(item: Item) {
        if (item.quality > MIN_QUALITY) {
            item.quality = item.quality - CONJURED_QUALITY_DEGRADE_FACTOR;
        }

        item.sellIn = item.sellIn - 1;
        if (item.sellIn < 0) {
            if (item.quality > MIN_QUALITY) {
                item.quality = item.quality - CONJURED_QUALITY_DEGRADE_FACTOR;
            }
        }

        if (item.quality < 0) {
            item.quality = 0;
        }
    }
}

function getItemBehavior(item: Item): ItemBehavior {
    if (item.name === 'Aged Brie') {
        return new AgedBrie();
    } else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
        return new BackstagePasses();
    } else if (item.name === 'Sulfuras, Hand of Ragnaros') {
        return new Sulfuras();
    } else if (item.name.startsWith('Conjured')) {
        return new Conjured();
    } else {
        return new NormalItem();
    }
}