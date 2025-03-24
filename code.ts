figma.showUI(__html__, { width: 300, height: 400 });

figma.ui.postMessage({ 
  type: 'selected-text', 
  text: figma.currentPage.selection[0]?.characters || ''
});

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'translate') {
    const selection = figma.currentPage.selection;
    
    if (selection.length === 0) {
      figma.notify('텍스트를 선택해주세요!');
      return;
    }

    for (const node of selection) {
      if (node.type === "TEXT") {
        await figma.loadFontAsync(node.fontName as FontName);
        node.characters = msg.translatedText;
      }
    }
  }
};