import { LineageView } from 'src/view/view';
import { onViewMount } from 'src/stores/view/subscriptions/on-view-mount';
import { onViewStateUpdate } from 'src/stores/view/subscriptions/on-view-state-update';
import { onDocumentStateUpdate } from 'src/stores/view/subscriptions/on-document-state-update';
import { onPluginSettingsUpdate } from 'src/stores/view/subscriptions/on-plugin-settings-update';
import { onDocumentsStateUpdate } from 'src/stores/view/subscriptions/on-documents-state-update';

export const viewSubscriptions = (view: LineageView) => {
    const unsubFromDocument = view.documentStore.subscribe(
        (documentState, action) => {
            if (!action) return;
            onDocumentStateUpdate(view, action);
        },
    );

    const unsubFromView = view.viewStore.subscribe(
        (viewState, action, initialRun) => {
            if (initialRun) {
                onViewMount(view);
            } else if (action) {
                onViewStateUpdate(view, action);
            }
        },
    );

    const unsubFromDocuments = view.plugin.documents.subscribe((_, action) => {
        if (!action) return;
        onDocumentsStateUpdate(view, action);
    });

    const unsubFromSettings = view.plugin.settings.subscribe(
        (state, action) => {
            if (!action) return;
            onPluginSettingsUpdate(view, state, action);
        },
    );

    return () => {
        unsubFromDocument();
        unsubFromView();
        unsubFromSettings();
        unsubFromDocuments();
    };
};
