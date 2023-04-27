import './AboutMe.css';
import my_foto from '../../images/my_foto.jpg';

function AboutMe() {

    return (
        <section className='student' id='student'>
            <h2 className='student__head'>Студент</h2>
            <div className='student_resume'>
                <div className='student__info'>
                    <article className='student__about'>
                        <h3 className='student__name'>Андрей</h3>
                        <p className='student__job'>Фронтенд-разработчик, 38 лет</p>
                        <p className='student__biography'>Я живу в г.Ростове-на-Дону. У меня есть жена и дочь. Работаю в технической поддержке одной крупной компании.
                            В 2021 году прошел пробные уроки по Фронтенд-разработке в Яндекс Практикуме, затянуло и решил пройти полный курс и развиваться в этой области,
                            так как нравится видеть визуальный результат своей работы.</p>
                    </article>
                    <ul className='student__links'>
                        <li className='student__element'>
                            <a className='student__link' href='https://www.facebook.com/andrey.kuzmenko.549' target='_blank' rel='noreferrer'>Facebook</a>
                        </li>
                        <li className='student__element'>
                            <a className='student__link' href='https://github.com/KAVtsure' target='_blank' rel='noreferrer'>Github</a>
                        </li>
                    </ul>
                </div>
                <img className="student__foto" src={my_foto} alt="Мое фото" />
            </div>
        </section>
    )
}

export default AboutMe;