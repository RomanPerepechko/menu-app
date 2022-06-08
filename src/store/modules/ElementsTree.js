/* eslint-disable */
class State {
  elements = [
    { id: 1, type: 'folder', name: '1', parentId: null },
    { id: 2, type: 'folder', name: '1', parentId: 1 },
    { id: 3, type: 'file', name: '1', parentId: 2 },
    { id: 4, type: 'file', name: '1', parentId: 1 },
    { id: 5, type: 'folder', name: '2', parentId: null },
    { id: 6, type: 'folder', name: '1', parentId: 5 },
    { id: 7, type: 'file', name: '1', parentId: 5 },
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
      let rootIndex = state.elements.findIndex(item => item.id === rootId);
      let childrenIndex = []
      let childrenIds = []
      state.elements.forEach((element, index) => {
        if (element.parentId === rootId) {
          childrenIndex.push(index)
          childrenIds.push(element.id)
        }
      });
      let countElements = 0
      while (countElements < childrenIndex.length) {
        countElements = childrenIndex.length
        state.elements.forEach((element, index) => {
          if (childrenIds.indexOf(element.parentId) > -1 && childrenIds.indexOf(element.id) < 0) {
            childrenIndex.push(index)
            childrenIds.push(element.id)
          }
        });
      }
      if (childrenIndex.length > 0) {
        childrenIndex.forEach(element => {
          state.elements.splice(element, 1)
        })
      }
      state.elements.splice(rootIndex, 1)
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
