import './AboutProject.css';

function AboutProject() {

    return (
        <section className='project' id='project'>
            <h2 className='project__head'>О проекте</h2>
            <article className='project__about'>
                <div className='project__paragraph'>
                    <h3 className='project__title'>Дипломный проект включал 5 этапов</h3>
                    <p className='project__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className='project__paragraph'>
                    <h3 className='project__title'>На выполнение диплома ушло 5 недель</h3>
                    <p className='project__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </article>
            <div>
                <div className='project__duration'>
                    <div className='project__backend'>1 неделя</div>
                    <div className='project__frontend'>4 недели</div>
                </div>
                <div className='project__duration-text'>
                    <div className='project__backend-text'>Back-end</div>
                    <div className='project__frontend-text'>Front-end</div>
                </div>
            </div>
        </section>
    )
}

export default AboutProject;