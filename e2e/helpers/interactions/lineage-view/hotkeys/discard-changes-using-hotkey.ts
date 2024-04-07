import { delay, SHORT } from '../../../general/delay';
import { __obsidian__ } from '../../../getters/obsidian/load-obsidian';
import { LINEAGE_CARD_ACTIVE } from '../../../getters/lineage-view/card/get-active-card';

export const discardChangesUsingHotkey = async () => {
    await __obsidian__.waitForSelector(LINEAGE_CARD_ACTIVE);
    await __obsidian__.keyboard.press('Escape');
    await __obsidian__.keyboard.press('Escape');
    await delay(SHORT);
};
