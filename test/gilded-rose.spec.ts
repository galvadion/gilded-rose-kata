import {Item, GildedRose, AgedBrie} from '@/gilded-rose';

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
});