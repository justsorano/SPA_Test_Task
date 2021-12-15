export const uselocalStorage = () => {
   function localInit(){
   const users = localStorage.getItem('users')
   if(!users){
      localStorage.setItem('users',JSON.stringify([
         {id:1, name:'Yakob', phone:'0993113851', date: new Date().toLocaleDateString()},
         {id:2, name:'Ira', phone:'0969912351', date: new Date().toLocaleDateString()},
         {id:3, name:'Glen', phone:'0935577121', date: new Date().toLocaleDateString()},
         {id:4, name:'Katya', phone:'0996681231', date: new Date().toLocaleDateString()},
         {id:5, name:'Kira', phone:'0505611271', date: new Date().toLocaleDateString()},
      ]))
   }
   return JSON.parse(users)
   }
   function localSetItem(item){
      const users = localInit()
      users.push(item)
      localStorage.setItem('users', JSON.stringify(users))
   }
   function localRemoveItem(id){
      let users = localInit()
      if(users){
      users = users.filter(u => u.id !== id)
      localStorage.setItem('users', JSON.stringify(users))
      location.reload()
      } else {
         return
      }
   }
   function localPutUser(id, user){
      let users = localInit()
      users = users.map(u =>{
         if(u.id === id){
            return Object.assign({},u,user)
         }
         return u
      })
      localStorage.setItem('users', JSON.stringify(users))
   }
   return {localInit, localSetItem, localRemoveItem, localPutUser}
}