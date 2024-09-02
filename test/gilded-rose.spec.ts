import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {

    it('should foo', () => {
        const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toBe('foo');
    });

    it('should initialize items correctly in the constructor', () => {
        const initialItems = [
            new Item('+5 Dexterity Vest', 10, 20),
            new Item('Aged Brie', 2, 0),
        ];
        const gildedRose = new GildedRose(initialItems);
        expect(gildedRose.items).toEqual(initialItems);

        const emptyGildedRose = new GildedRose();
        expect(emptyGildedRose.items).toEqual([]);
    });

    it('should update normal item quality correctly', () => {
        const gildedRose = new GildedRose([new Item('+5 Dexterity Vest', 10, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toBe('+5 Dexterity Vest');
        expect(items[0].sellIn).toBe(9);
        expect(items[0].quality).toBe(19);
    });

    it('should degrade normal item quality twice as fast after sell by date', () => {
        const gildedRose = new GildedRose([new Item('+5 Dexterity Vest', 0, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(-1);
        expect(items[0].quality).toBe(18);
    });

    it('should not decrease quality of normal item below 0', () => {
        const gildedRose = new GildedRose([new Item('+5 Dexterity Vest', 10, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(9);
        expect(items[0].quality).toBe(0);
    });

    it('should increase Aged Brie quality correctly', () => {
        const gildedRose = new GildedRose([new Item('Aged Brie', 2, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(1);
        expect(items[0].quality).toBe(1);
    });

    it('should increase Aged Brie quality twice as fast after sell by date', () => {
        const gildedRose = new GildedRose([new Item('Aged Brie', 0, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(-1);
        expect(items[0].quality).toBe(2);
    });

    it('should not increase Aged Brie quality above 50', () => {
        const gildedRose = new GildedRose([new Item('Aged Brie', 2, 50)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(1);
        expect(items[0].quality).toBe(50);
    });

    it('should increase Backstage passes quality correctly', () => {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(14);
        expect(items[0].quality).toBe(21);
    });

    it('should increase Backstage passes quality by 2 when sellIn is 10 or less', () => {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(9);
        expect(items[0].quality).toBe(22);
    });

    it('should increase Backstage passes quality by 3 when sellIn is 5 or less', () => {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(4);
        expect(items[0].quality).toBe(23);
    });

    it('should drop Backstage passes quality to 0 after concert', () => {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(-1);
        expect(items[0].quality).toBe(0);
    });

    it('should not increase Backstage passes quality above 50', () => {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 15, 50)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(14);
        expect(items[0].quality).toBe(50);
    });

    it('should not change Sulfuras quality or sellIn', () => {
        const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 0, 80)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(0);
        expect(items[0].quality).toBe(80);
    });

    it('should degrade Conjured item quality twice as fast', () => {
        const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 3, 6)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(2);
        expect(items[0].quality).toBe(4);
    });

    it('should degrade Conjured item quality four times as fast after sell by date', () => {
        const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 0, 6)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(-1);
        expect(items[0].quality).toBe(2);

    });

    it('should not decrease Conjured item quality below 0', () => {
        const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 3, 1)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(2);
        expect(items[0].quality).toBe(0);
    });
});