function _getListItem(list){
   const li = document.createElement('li')
   li.insertAdjacentHTML('afterbegin',`
   <a href='${list.url}'>${list.title}</a>
   `)
   li.addEventListener('click', list.handler)
   document.getElementById('ul').appendChild(li)
}
function _getTemplate(options){
   const navbar = document.createElement('nav')
   const { links, logo, classes, containerId} = options
   navbar.insertAdjacentHTML('afterbegin',
   `
   <div class='${classes.join(' ')}'>
      <a href='${logo.url}' class='${logo.classes.join(' ')}'>${logo.title}</a>
      <ul class='right' id='ul'>
      </ul>
   </div>
   `
   )
   document.getElementById(containerId).prepend(navbar)
   links.forEach(_getListItem)
   return navbar
}
export const Navbar = (options) => {
   const navbar = _getTemplate(options)
}