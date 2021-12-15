import { Navbar } from './assets/components/Navbar'
import { Form } from './assets/components/Form'
import { UserList } from './assets/components/UserList'
import { render } from './assets/models/render'
import { uselocalStorage } from './assets/models/localStorage'
import 'normalize.css'
import '../src/assets/scss/main.scss'
const {localInit, localRemoveItem, localPutUser} = uselocalStorage()
let value = {
   phone:'',
   name:''
}
const users = localInit()
function saveHandler(id){
   const newObj = {
      name: value.name,
      phone: value.phone,
      date: new Date().toLocaleDateString()
   }
   localPutUser(id, newObj)
   location.reload()
}
const userlist = UserList({
   users,
   btns:[
   {
      title: 'Edit',
      classes: ['btn'],
      handler(id, e){
      const [,name,phone,date,editBtn,removeBtn] = e.target.parentNode.children
      name.outerHTML = `<input type='text' data-name >`
      phone.outerHTML = `<input type='text' data-phone >`
      editBtn.textContent = 'Save'
      removeBtn.style.display = 'none'
      editBtn.removeEventListener('click',this.handler)
      const n = document.querySelector('[data-name]')
      const p = document.querySelector('[data-phone]')
      n.addEventListener('input',(e) => value.name = e.target.value)
      p.addEventListener('input',(e) => value.phone = e.target.value)
      editBtn.addEventListener('click',() => saveHandler(id))
      },
   },
   {
      title: '&times;',
      classes: ['btn'],
      handler(id, e){
         localRemoveItem(id)
      },
   }
   ]
})
render(userlist)
const nav = Navbar({
   logo: {title: 'Users',url: '/', classes: ['brand-logo']},
   links: [
      {title: 'Users List', url: '/', handler(e){
         e.preventDefault()
         document.querySelector('.container').innerHTML = ''
         render(userlist)
      }},
      {title: 'Add User', url: '/', handler(e){
      e.preventDefault()
      document.querySelector('.container').innerHTML = ''
      render(form)
      }}
   ],
   classes: ['nav-wrapper', 'amber darken-3', 'ph2'],
   containerId: 'app'
})
const form = Form({
   classes:['col','s12'],
   inputs: [
      {
      type: 'text',
      name: 'name',
      classes: ['validate']
      },
      {
      type: 'tel',
      name: 'phone',
      classes: ['validate'], 
      pattern: '[0-9]{10}'
      }
   ],
   btns: [{
      type: 'submit',
      title: 'Submit',
      classes: ['btn']
   }]
})


