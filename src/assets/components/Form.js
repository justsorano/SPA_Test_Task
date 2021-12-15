import { uselocalStorage } from '../models/localStorage'
const { localSetItem } = uselocalStorage()
function _btnList(btns = []){
   const array = []
   if(btns){
      btns.forEach(b => {
         const btn = document.createElement('button')
         btn.textContent = b.title
         btn.type = b.type
         btn.classList.add(...b.classes)
         array.push(btn)
      })
      return array
   }
}
function _getTemplate(options){
   const { classes, inputs, btns } = options
   const form = document.createElement('form')
   const buttons = _btnList(btns)
   form.classList.add(...classes)
   form.insertAdjacentHTML('afterbegin',`
   ${inputs.map(i => {
      return `
   <div class='row'>
      <div class='input-field col s12'>
         <input id='${i.name}' 
         type='${i.type}' 
         class='${i.classes}' 
         ${i.pattern ? `pattern=${i.pattern}` : ''} 
         required 
         >
         <label for='${i.name}'>${i.name.toUpperCase()}</label>
      </div>
   </div>
   `
   }).join(' ')}
   `)
   buttons.forEach(b => form.appendChild(b))
   return form
}

export const Form = (options) =>{
   const form = _getTemplate(options)
   const listener = () => {
      const name = document.getElementById('name')
      const phone = document.getElementById('phone')
      if(name.value && phone.value){
         const newUsers = {
            id: Date.now(),
            name:name.value,
            phone:phone.value,
            date: new Date().toLocaleDateString()
         }
         // тут запрос на сервер fetch(url,{method:'POST',body:newUsers, headers:{'Content-Type: 'application/json' '}) можно написать для запросов хук и из него уже работать
         localSetItem(newUsers)
         name.value = ''
         phone.value = ''
      } else {
         return 
      }
   }
   form.addEventListener('submit', listener)
   return form
}