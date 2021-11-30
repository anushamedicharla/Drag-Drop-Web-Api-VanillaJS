const jumbledWords = document.querySelectorAll('#jumbledWordsWrapper > span');
const orderedWords = document.querySelectorAll('#orderedWordsWrapper > span');
console.log('jumbledWords: ', jumbledWords);
console.log('orderedWords: ', orderedWords);


// On all the source elements, we’ll add methods to handle the dragstart event firing
jumbledWords.forEach(el => {
    el.addEventListener('dragstart', dragStartHandler);
    el.addEventListener('dragend', dragEndHandler);
});
function dragStartHandler(e) {
    console.log('dragStartHandler running');
    e.dataTransfer.setData('text', e.target.getAttribute('data-source-id'));
    e.target.style = 'opacity: 0.3';
    console.log(e.target);
}

function dragEndHandler(e) {
    console.log('dragEndHandler running');
    e.target.style = 'opacity: 1';
}

orderedWords.forEach(el => {
    el.addEventListener('dragenter', dragEnterHandler);
    el.addEventListener('dragover', dragOverHandler);
    el.addEventListener('dragleave', dragLeaveHandler);
    el.addEventListener('drop', dropHandler);
})

function dragEnterHandler(e) {
    console.log('dragEnterHandler running');
    e.target.style = 'border: 2px dashed gray; box-sizing: border-box; background: whitesmoke';
}

function dragOverHandler(e) {
    console.log('dragOverHandler running');
    e.preventDefault();
}

function dragLeaveHandler(e) {
    console.log('dragLeaveHandler running');
    e.target.style = 'border: none; background: #abcdef';
}

function dropHandler(e) {
    e.preventDefault();
    dragLeaveHandler(e); 
    console.log('dropHandler running');

    const dataSourceId = e.dataTransfer.getData('text');
    const dataTargetId = e.target.getAttribute('data-target-id');
    console.warn(dataSourceId, dataTargetId);

    if (dataSourceId === dataTargetId) {
        console.log(document.querySelector([dataTargetId]));
        e.target.insertAdjacentHTML('afterbegin', dataSourceId);
        e.target.style = 'border: none; background: #abcdef';
        e.target.setAttribute('draggable', false);
        // preventing the already used source span element from being dragged again
        let sourceElemDataId = 'span[data-source-id="' + dataSourceId + '"]';
        let sourceElemSpanTag = document.querySelector(sourceElemDataId);
        Object.assign(sourceElemSpanTag, {
            className: 'no-longer-draggable',
            draggable: false,
        });
    }
}