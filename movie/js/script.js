'use strict';

document.addEventListener('DOMContentLoaded', () =>{

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    const adv = document.querySelectorAll('.promo__adv img'),
        titleAdv = document.querySelector('.promo__adv-title'),   
        poster =document.querySelector('.promo__bg'),
        genre = poster.querySelector('.promo__genre'),
        movieList =document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector('form.add'),
        addInput = addForm.querySelector('.adding__input');
        // checkbox = addForm.querySelector ('[type="checkbox"]');


    addForm.addEventListener('submit', (event) =>{
        event.preventDefault();
            
        let newFilm =addInput.value;
        // const favorite =checkbox.checked;
    
        
        //если не пустая строка, то условие выполнится.Если нажать на Подвердить, 
        // то пустые строки в списке фильмов не появляется
       if (newFilm) {
  
            // проверка нового фильма на кол-во символов
            if (newFilm.length > 21){
                newFilm = `${newFilm.substring (0, 22)}...`;
            }
        
            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);

            createMovieList (movieDB.movies, movieList);
        }
    
        event.target.reset();
    });    
        

    const deleteAdv = (arr) =>{
        arr.forEach (item => {
            item.remove();
        });
    };
    
    const deleteTitle = () => {
        titleAdv.remove();
    };
  

    const makeChanges = () => {
        genre.textContent ='драма';
        poster.style.backgroundImage = 'url("img/bg.jpg")';
    };

    
    const sortArr = (arr) => {
        arr.sort();
    };


    function createMovieList (films, parent) {
        parent.innerHTML = "";
        sortArr(films); //сортируем по алфавиту, после удалений ненужных фильмов через мусорку


        films.forEach ((film, i) => {
            parent.innerHTML+= `
            <li class ="promo__interactive-item"> ${i+1} ${film}
                <div class = "delete"></div>
            </li>`;
        });

        document.querySelectorAll('.delete').forEach((btn, i) =>{
            btn.addEventListener('click', () =>{
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);

                // чтобы при удалении нумерация тоже менялась, создаем новый список:
                createMovieList (films, parent);
            });
        }); 

     

    }
    
    deleteAdv (adv);
    deleteTitle();
    makeChanges();
    createMovieList (movieDB.movies, movieList);
   
});