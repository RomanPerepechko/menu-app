/* eslint-disable */
class State {
  elements = [
    { id: 1, type: 'folder', name: '1', parentId: null },
    { id: 2, type: 'folder', name: '1-1', parentId: 1 },
    { id: 3, type: 'file', name: '1-1-1', parentId: 2 },
    { id: 4, type: 'file', name: '1-2', parentId: 1 },
    { id: 5, type: 'folder', name: '2', parentId: null },
    { id: 6, type: 'folder', name: '2-1', parentId: 5 },
    { id: 7, type: 'file', name: '2-2', parentId: 5 },
    { id: 8, type: 'file', name: '2', parentId: null },
  ];
  treeElements = this.elements.reduce((a, c) => {
    c.children = this.elements.filter(i => i.parentId == c.id)
    a.push(c)
    return a
  }, [])
    .filter(i => i.parentId == null)
}
const ElementsTreeModule = {
  namespaces: true,
  state: new State(),
  mutations: {
    SET_ELEMENT_NAME(state, data) {
      let index = state.elements.findIndex(item => item.id === data.id);
      state.elements[index].name = data.title
    },
    DELETE_ELEMENT(state, rootId) {
      let children = []
      state.elements.forEach(element => {
        if (element.parentId === rootId) {
          children.push(element.id)
        }
      });
      let oldLength = 0
      while (oldLength < children.length) {
        oldLength = children.length
        state.elements.forEach(element => {
          if (children.indexOf(element.parentId) > -1 && children.indexOf(element.id) === -1) {
            children.push(element.id)
          }
        });
      }
      children.push(rootId)
      state.elements = state.elements.filter(element => children.indexOf(element.id) === -1)
      state.treeElements = state.elements.reduce((a, c) => {
        c.children = state.elements.filter(i => i.parentId == c.id)
        a.push(c)
        return a
      }, [])
        .filter(i => i.parentId == null)
    }
  },
  actions: {
    setElementName(context, data) {
      context.commit("SET_ELEMENT_NAME", data);
    },
    deleteElement(context, id) {
      context.commit("DELETE_ELEMENT", id);
    }
  },
  getters: {
    getTree(state) {
      return state.treeElements;
    }

  },
};

export { ElementsTreeModule };
