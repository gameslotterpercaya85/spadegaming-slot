'use babel';

import SpadegamingSlotView from './spadegaming-slot-view';
import { CompositeDisposable } from 'atom';

export default {

  spadegamingSlotView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.spadegamingSlotView = new SpadegamingSlotView(state.spadegamingSlotViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.spadegamingSlotView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'spadegaming-slot:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.spadegamingSlotView.destroy();
  },

  serialize() {
    return {
      spadegamingSlotViewState: this.spadegamingSlotView.serialize()
    };
  },

  toggle() {
    console.log('SpadegamingSlot was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
