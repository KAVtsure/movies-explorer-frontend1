import './FilterCheckbox.css';

function FilterCheckbox({ isShortMovies, onCheckBox }) {
    return (
        <div className='checkbox__container'>
            <label className='checkbox__switch'>
                <input type='checkbox'
                    className='checkbox__input'
                    id='checkbox'
                    onChange={onCheckBox}
                    checked={isShortMovies}

                />
                <span className='checkbox__slider'></span>
            </label>
            <p className='checkbox__text'>Короткометражки</p>
        </div>
    )
}

export default FilterCheckbox;