import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import Command from '@ckeditor/ckeditor5-core/src/command';

import AnchorIcon from './icons/anchor.svg';
import './anchor.css';

export default class AnchorIdPlugin extends Plugin {

  static get pluginName() {
    return 'AnchorId';
  }

  init() {
    const editor = this.editor;

    editor.commands.add('anchorId', new AnchorIdCommand(editor));

    const schema = editor.model.schema;
    const definitions = schema.getDefinitions();

    for (const name of Object.keys(definitions)) {
      schema.extend(name, { allowAttributes: ['id'] });
    }

    editor.conversion.for('downcast').add(dispatcher => {
      dispatcher.on('attribute:id', (evt, data, api) => {
        const viewWriter = api.writer;
        const viewElement = api.mapper.toViewElement(data.item);

        if (!viewElement) return;

        if (data.attributeNewValue) {
          viewWriter.setAttribute('id', data.attributeNewValue, viewElement);

          viewWriter.addClass('has-anchor-id', viewElement);

          viewWriter.setAttribute('data-anchor-id', data.attributeNewValue, viewElement);

        } else {
          viewWriter.removeAttribute('id', viewElement);
          viewWriter.removeClass('has-anchor-id', viewElement);
          viewWriter.removeAttribute('data-anchor-id', viewElement);
        }
      });
    });

    editor.conversion.for('upcast').attributeToAttribute({
      view: 'id',
      model: 'id'
    });

    editor.ui.componentFactory.add('anchorId', locale => {
      const button = new ButtonView(locale);
      const command = editor.commands.get('anchorId');

      button.set({
        label: 'Anchor',
        tooltip: true,
        withText: false,
        icon: AnchorIcon
      });

      button.bind('isOn').to(command, 'value', value => !!value);

      button.on('execute', () => {
        const currentId = command.value || '';
        const newId = prompt('Enter ID:', currentId);

        if (newId !== null) {
          editor.execute('anchorId', { value: newId });
        }
      });

      return button;
    });
  }
}

class AnchorIdCommand extends Command {

  refresh() {
    const editor = this.editor;
    const selection = editor.model.document.selection;

    const element =
      selection.getSelectedElement() ||
      selection.getFirstPosition().parent;

    this.value = element.getAttribute('id') || null;

    this.isEnabled = true;
  }

  execute({ value }) {
    const editor = this.editor;

    editor.model.change(writer => {
      const selection = editor.model.document.selection;
      const element =
        selection.getSelectedElement() ||
        selection.getFirstPosition().parent;

      if (value) {
        writer.setAttribute('id', value, element);
      } else {
        writer.removeAttribute('id', element);
      }
    });
  }
}
