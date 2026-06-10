export default function handleData() {
  try {
    return fetch('../../../../products/index.json').then((res) => 
      res.json()
      )
  } catch(err){
      console.log(err)
  }
}