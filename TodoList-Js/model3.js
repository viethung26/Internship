const data = [
    {
        title: 'List 1',
        items: [
            { title: 'Task 1', done: false, priority: 0 },
            { title: 'Task 2', done: false, priority: 0 },
            { title: 'Task 3', done: false, priority: 0 },
            { title: 'Task 4', done: false, priority: 0 }
        ]
    },
    {
        title: 'List 2',
        items: [
            { title: 'Task 1', done: false, priority: 0 },
            { title: 'Task 2', done: false, priority: 0 },
            { title: 'Task 3', done: false, priority: 0 },
            { title: 'Task 4', done: false, priority: 0 }
        ]
    }

    ]
const $el = document.getElementById('list')
function add(title) {
    data.push({ title, done: false, priority: 0 })
    render()
}
function remove(index) {
    data.splice(index, 1)
    render()
}
function render() {
    $el.innerHTML = ''
    data.forEach((item, index) => {
        const $item = document.createElement('li')
        $item.innerHTML = item.title
        $el.appendChild($item)
    })
}
render()

new Todo('list1', [])