function _createBtnsItem(btns, id){
   const array = []
   btns.forEach(b => {
      const btn = document.createElement('button')
      btn.classList.add(b.classes.join(' '))
      btn.innerHTML = b.title
      btn.addEventListener('click', e => b.handler(id, e))
      array.push(btn)
   })
   return array
}
function _createListItem(u, btns){
   const li = document.createElement('li')
   li.classList.add('user')
   li.dataset.id = u.id
   for(let key in u){
      li.appendChild(_createItem(u[key]))
   }
   const array = _createBtnsItem(btns, u.id)
   array.forEach(b =>{
      li.appendChild(b)
   })
   return li
}
function _createItem(content){
   const span = document.createElement('span')
   span.textContent = content
   span.classList.add('user__item')
   return span
}
function _getTemplate(options){
   const { users, btns } = options
   const header = document.createElement('div')
   const ul = document.createElement('ul')
   const wrapper = document.createElement('div')
   if(users){
      ul.classList.add('userlist')
      wrapper.classList.add('users')
      users.reverse().forEach(user => ul.appendChild(_createListItem(user, btns)))
      wrapper.appendChild(ul)
   } else {
      const p = document.createElement('p')
      p.textContent = 'it\'s empty here...'
      wrapper.appendChild(p)
      return wrapper
   }
   if(!ul.innerHTML){
      const p = document.createElement('p')
      p.textContent = 'it\'s empty here...'
      wrapper.appendChild(p)
      return wrapper
   }
   return wrapper
}

export const UserList = (options) =>{
   const list = _getTemplate(options)
   return list
}