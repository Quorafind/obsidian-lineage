import { LineageView } from 'src/view/view';

export const applyFontSize = (view: LineageView, fontSize: number) => {
    if (fontSize)
        view.containerEl.style.setProperty('--font-text-size', `${fontSize}px`);
    else view.containerEl.style.removeProperty('--font-text-size');
};
