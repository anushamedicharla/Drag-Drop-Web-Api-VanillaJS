let sourceElem = document.getElementById('source');
let targetElem = document.getElementById('target');
sourceElem.addEventListener('dragstart', function (event) {
    event.currentTarget.style = "opacity:0.3";
    targetElem.style = "border: 10px dashed gray;";
    // Hook into the dragstart event and use the event.dataTransfer.setData() to pass in the source element to the dataTransfer object;
    event.dataTransfer.setData('text', event.target.id);
});

sourceElem.addEventListener('dragend', function (event) {
    sourceElem.style = "opacity: 1";
    targetElem.style = "border: none";
});

// Event triggered by the draggable source element.
// Preventing the default behavior (which is opening as a link 
// for specific elements). In a nutshell, we’re setting the stage for 
// being able to perform some operation once the drop event is triggered.
targetElem.addEventListener('dragover', function (event) {
    event.preventDefault();
});

// Event triggered by only the target element
targetElem.addEventListener('drop', function (event) {
    // Hook into the drop event and use the event.dataTransfer.getData() to get the source element’s data from the dataTransfer object.
    event.target.appendChild(document.getElementById(event.dataTransfer.getData('text')));
    console.log('DROP!');
});

