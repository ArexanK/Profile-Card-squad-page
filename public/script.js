//Hoofdletter gevoelig afhalen

const searchbar = document.querySelector('.search')

searchbar.addEventListener('input', search)

function search() {
    let input = this.value
    input = input.toLowerCase();

    let x = document.getElementsByClassName('members');

    for (i = 0; i < x.length; i++) {
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display = 'none';
        } else {
            x[i].style.display = 'flex';
        }
        console.log(x[i].hidden)
    }
    console.log(this.value)
}


//default search


const squadDefault = document.querySelector

function squadpage() {

    // Returning Input Radio defaultvalue Property
    let x = document.getElementsByClassName(
        "squadpage-a").defaultValue;


}