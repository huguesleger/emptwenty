(function(){

    /* Creating textarea only once, but not each time */
    let area = document.createElement('textarea');
    document.body.appendChild( area );
    area.style.display = "none";
    
    let content = document.querySelectorAll('.js-content');
    let copy    = document.querySelectorAll('.js-copy');
    
    for( let i = 0; i < copy.length; i++ ){
      copy[i].addEventListener('click', function(){
        area.style.display = "block";
        /* because the classes are paired, we can use the [i] index from the clicked button,
        to get the required text block */
        area.value = content[i].innerText;
        area.select();
        document.execCommand('copy');   
        area.style.display = "none";
    
        /* decorative part */
        this.innerHTML = 'Le nom est bien copié';
        this.classList.add('button-success');
        /* arrow function doesn't modify 'this', here it's still the clicked button */
        setTimeout( () => 
            this.innerHTML = "Copier le nom", 3000 );
        setTimeout( () => 
            this.classList.remove('button-success'), 3000 );
      });
    }
    
    })();