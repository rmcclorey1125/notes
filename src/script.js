document.addEventListener("DOMContentLoaded", function(e){
    const notes = document.querySelector(".notesGrid");
    let selected = false;

    document.addEventListener("click", function(e){
        e.preventDefault();
    
        if (e.target.id === "noteButton"){
            addNote(e)
        }if (e.target.className === "delete"){
            deleteNote(e);
        } else if (e.target.className === "edit"){
            editNote(e);
        } else if (e.target.className === "note"){
            select(e);
        } else if (e.target.className === "note selected"){
            e.target.classList.remove("selected");
            selected = false;
        };
    });

    const addNote = (e) =>{
        newDiv = document.createElement('div');
        newNote = document.createElement('p');
        delBtn = document.createElement('button');
        editBtn = document.createElement('button');
        delBtn.textContent = "Delete";
        editBtn.textContent = "Edit";
        newNote.textContent = e.target.parentNode.childNodes[3].value;
        e.target.parentNode.childNodes[3].value = "";
        newDiv.setAttribute("class", "note");
        newNote.setAttribute("class", "noteText");
        delBtn.setAttribute("class", "delete");
        editBtn.setAttribute("class", "edit");
        newDiv.append(newNote);
        newDiv.append(editBtn);
        newDiv.append(delBtn);
        notes.append(newDiv);
    }

    const deleteNote = (e) =>{
        text = e.target.parentNode
        text.remove()
    }

    const closeModal = () => {
        if (modal) {
            modal.remove();
        }
    }

    const editNote = (e) =>{
        currNote = e.target.parentNode.childNodes[0].textContent

        modal = document.createElement('div');
        modal.classList.add('modal');

        modalHead = document.createElement('h4');
        modalHead.textContent = "Edit Note"
        modal.append(modalHead)

        textEditContainer = document.createElement('div');
        textEditContainer.classList.add('modalInput');
        modal.append(textEditContainer);

        textEditArea = document.createElement('textarea');
        textEditArea.addEventListener('input', function() {
            editedNote = textEditArea.value;
        });
        textEditArea.value = currNote;
        textEditContainer.append(textEditArea);
        
        modalActionsContainer = document.createElement('div');
        modalActionsContainer.classList.add('modalActions');
        modal.append(modalActionsContainer);
      
        cancelBtn = document.createElement('button');
        cancelBtn.classList.add('cancel');
        cancelBtn.textContent = 'Cancel';
        cancelBtn.addEventListener('click', closeModal);
        modalActionsContainer.append(cancelBtn);
      
        saveBtn = document.createElement('button');
        saveBtn.classList.add('save');
        saveBtn.textContent = 'Save';
        saveBtn.addEventListener('click', function() {

            closeModal();
            if (editedNote.trim().length > 0) {
                e.target.parentNode.childNodes[0].textContent = editedNote;
            }
        });
        modalActionsContainer.append(saveBtn);
      
        document.body.insertBefore(modal, notes);
    }

    const select = (e) =>{
        if(!selected){
            first = e.target;
            first.classList.add("selected");
            selected = true;
        } else {
            second = e.target;
            swap(first, second);
            selected = false;
            first.classList.remove("selected");
        };
    };

    const swap = (node1, node2) => {
        afterNode2 = node2.nextElementSibling;
        parent = node2.parentNode;
        if (node1 === afterNode2){
            node2.replaceWith(node1);
            parent.insertBefore(node2, afterNode2.nextElementSibling);
        } else {
            node1.replaceWith(node2);
            parent.insertBefore(node1, afterNode2);
        };
    };
});