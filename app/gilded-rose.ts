export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }

    updateQuality(){
        if(this.quality>0)
            this.quality--;
    }
    updateSellIn(){
        this.sellIn--;
    }
}

export class ConjuredItem extends Item {
    constructor(sellIn,quality) {
        super("Conjured item",sellIn,quality);
    }
    updateQuality() {
        if(this.quality <50)
            this.quality -=2;
    }
}

export class AgedBrie extends Item {
    constructor(sellIn,quality) {
        super("Aged Brie",sellIn,quality);
    }
    updateQuality() {
        if(this.quality <50)
            this.quality++;
    }
}

export class BackStagePasses extends Item {
    constructor(sellIn,quality) {
        super("Backstage passes to a TAFKAL80ETC concert",sellIn,quality);
    }
    updateQuality() {
        if(this.quality < 50)
            if(this.sellIn >= 6 && this.sellIn < 11)
                this.quality += 2;
            else if(this.sellIn >= 0 && this.sellIn < 6)
                this.quality += 3;
            else if(this.sellIn < 0)
                this.quality = 0;
    }
}

export class LegendaryItem extends Item {
    constructor(sellIn,quality) {
        super("Sulfuras, Hand of Ragnaros",sellIn,quality);
    }
    updateQuality() {
    }
    updateSellIn() {
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            this.items[i].updateSellIn();
            this.items[i].updateQuality()
            if (this.items[i].sellIn < 0) {
                this.items[i].updateQuality()
            }
        }
        return this.items;
    }
}