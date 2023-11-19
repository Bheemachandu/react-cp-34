import {IoMdSearch} from 'react-icons/io'
import './index.css'

const FiltersGroup = props => {
  const searching = event => {
    console.log(event.target.value)
    const {updateSearchText} = props
    updateSearchText(event.target.value)
  }

  const enterSearch = event => {
    const {updateEnterSearch} = props
    if (event.key === 'Enter') {
      updateEnterSearch()
    }
  }

  const filtercategoryOptions = () => {
    const {categoryOptions} = props
    console.log('bhhjk')
    return categoryOptions.map(category => {
      const {updateCategory, activeCategory} = props
      const classname =
        activeCategory === category.categoryId
          ? 'categoryPara2'
          : 'categoryPara1'
      const changeCategory = () => {
        updateCategory(category.categoryId)
      }
      return (
        <li onClick={changeCategory} className="categoryList">
          <p className={classname}>{category.name}</p>
        </li>
      )
    })
  }

  const filterRatingOptions = () => {
    const {ratingsList} = props
    return ratingsList.map(rating => {
      const {updateRating, activeRating} = props
      const ratingClassname =
        activeRating === rating.ratingId ? 'ratingListItem2' : 'ratingListItem1'
      const changeRating = () => {
        console.log(rating.ratingId)
        updateRating(rating.ratingId)
      }
      return (
        <li onClick={changeRating} className={ratingClassname}>
          <img
            className="starImg"
            alt={`rating ${rating.ratingId}`}
            src={rating.imageUrl}
          />
          <p>&up</p>
        </li>
      )
    })
  }
  const {searchText} = props
  const clearFilter = () => {
    const {clearAllFilter} = props
    console.log('anagani')
    clearAllFilter()
  }

  return (
    <div className="filters-group-container">
      <div className="searchContainer">
        <input
          placeholder="search"
          className="searchButton"
          type="search"
          onChange={searching}
          onKeyDown={enterSearch}
          value={searchText}
        />
        <IoMdSearch />
      </div>
      <h1 className="categoryHeading">Category</h1>
      {filtercategoryOptions()}
      <h1 className="categoryHeading">Rating</h1>
      {filterRatingOptions()}
      <button onClick={clearFilter} className="clearFilterBtn" type="button">
        Clear Filters
      </button>
    </div>
  )
}
export default FiltersGroup
