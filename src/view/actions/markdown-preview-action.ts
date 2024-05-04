import { MarkdownRenderer } from 'obsidian';
import { getPlugin, getView } from 'src/view/components/container/context';
import { contentStore } from 'src/stores/document/derived/content-store';

export const markdownPreviewAction = (element: HTMLElement, nodeId: string) => {
    const plugin = getPlugin();
    const view = getView();
    const store = view.documentStore;

    const render = (content: string) => {
        if (view && element) {
            element.empty();
            MarkdownRenderer.render(
                plugin.app,
                /^> \w/.test(content)
                    ? content
                    : content.replace(/^$/gm, '&nbsp;'),
                element,
                store.getValue().file.path as string,
                view,
            );
        }
    };

    const $content = contentStore(view, nodeId);
    const unsub = $content.subscribe((content) => {
        render(content);
    });
    return {
        destroy: () => {
            unsub();
        },
    };
};
