export default function handleData() {
    return fetch('../../products/index.json').then((res) => 
        res.json()
    )
}