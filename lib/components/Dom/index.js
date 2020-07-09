const DOM = (html, scope) => {
  // Crea un nodo vacío e inyecta una cadena html usando .innerHTML
  // en caso de que la variable no sea una cadena que suponemos que ya es un nodo
  let node

  if (html.constructor === String) {
    node = document.createElement('div')
    node.innerHTML = html
  } else {
    node = html
  }

  // Crea usos y objetos para los cuales crearemos variables que apuntarán a los nodos creados
  const _scope = scope || {}

  // Función recursiva que leerá cada nodo y cuando un nodo contiene
  // el atributo var agrega una referencia en el objeto de alcance
  function toScope (nnode, sscope) {
    const children = nnode.children

    for (const child of children) {
      if (child.getAttribute('var')) {
        const names = child.getAttribute('var').split('.')
        let obj = sscope
        while (names.length > 0) {
          const _property = names.shift()
          if (names.length === 0) {
            obj[_property] = child
          } else {
            if (!obj.hasOwnProperty.call(_property)) {
              obj[_property] = {}
            }
            obj = obj[_property]
          }
        }
      }
      toScope(child, sscope)
    }
  }

  toScope(node, _scope)

  if (html.constructor !== String) {
    return html
  }

  // Si el nodo en la jerarquía más alta es uno, devuélvalo

  if (node.childNodes.length === 1) {
    // Si no se establece un ámbito para agregar variables de nodo,
    // adjunte el objeto que creamos al nodo de mayor jerarquía

    // agregando la propiedad de nodos.
    if (!scope) {
      node.childNodes[0].nodes = _scope
    }
    return node.childNodes[0]
  }

  // si el nodo en la jerarquía más alta es más de uno, devuelve un fragmento
  const fragment = document.createDocumentFragment()
  const children = node.childNodes

  // Agrega notas a DocumentFragment
  while (children.length > 0) {
    if (fragment.append) {
      fragment.append(children[0])
    } else {
      fragment.appendChild(children[0])
    }
  }

  fragment.nodes = _scope
  return fragment
}

export default DOM
