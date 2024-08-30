import {Item, GildedRose, AgedBrie, LegendaryItem, BackStagePasses, ConjuredItem} from '@/gilded-rose';

describe('Gilded Rose', () => {
    it('should decrease quality and sellIn', () => {
        const gildedRose = new GildedRose([new Item('foo', 1, 1)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(0);
        expect(items[0].quality).toBe(0);
    });

    it('given sellIn is zero, quality degrades as fast', () => {
        const gildedRose = new GildedRose([new Item('random item', 0, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(-1);
        expect(items[0].quality).toBe(18);
    });

    it('given quality is zero, it should not decrease below zero', () => {
        const gildedRose = new GildedRose([new Item('random item', 0, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(-1);
        expect(items[0].quality).toBe(0);
    });

    it('given aged brie quality should increase by one', () => {
        const gildedRose = new GildedRose([new AgedBrie(5, 5)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(4);
        expect(items[0].quality).toBe(6);
    });

    it('given aged brie sellIn past 0, quality should increase by two', () => {
        const gildedRose = new GildedRose([new AgedBrie(-1, 5)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(-2);
        expect(items[0].quality).toBe(7);
    });

    it('The quality of an item can never be over 50', () => {
        const gildedRose = new GildedRose([new AgedBrie(5, 50)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(4);
        expect(items[0].quality).toBe(50);
    });

    it('Legendary Items never has to be sold or decreases in quality', () => {
        const gildedRose = new GildedRose([new LegendaryItem(5, 50)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(5);
        expect(items[0].quality).toBe(50);
    });
    it('Backstage passes, should increase quality by 2, when sellIn between 5 and 10', () => {
        const gildedRose = new GildedRose([new BackStagePasses(7, 10)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(6);
        expect(items[0].quality).toBe(12);
    });

    it('Backstage passes, should increase quality by 3, when sellIn between 1 and 5', () => {
        const gildedRose = new GildedRose([new BackStagePasses(5, 10)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(4);
        expect(items[0].quality).toBe(13);
    });

    it('Backstage passes, should drop quality to 0, when sellIn less than 0', () => {
        const gildedRose = new GildedRose([new BackStagePasses(0, 10)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(-1);
        expect(items[0].quality).toBe(0);
    });

    it('Conjured item, should drop quality twice as fast', () => {
        const gildedRose = new GildedRose([new ConjuredItem(5, 10)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(4);
        expect(items[0].quality).toBe(8);
    });
});