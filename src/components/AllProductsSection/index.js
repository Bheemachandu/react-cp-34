import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

console.log(categoryOptions)
const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const apiStatusList = {
  statusSuccess: 'SUCCESS',
  statusFailure: 'FAILURE',
  statusInprogress: 'PROGRESS',
}

console.log(ratingsList)
class AllProductsSection extends Component {
  state = {
    productsList: [],
    apiStatus: '',
    activeOptionId: sortbyOptions[0].optionId,
    searchText: '',
    activeCategory: '',
    activeRating: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  updateSearchText = text => {
    console.log('chand')
    console.log(text)
    this.setState({searchText: text})
  }

  updateEnterSearch = () => {
    this.getProducts()
  }

  updateCategory = text => {
    console.log(text)
    this.setState({activeCategory: text}, this.getProducts)
  }

  updateRating = text => {
    this.setState({activeRating: text}, this.getProducts)
  }

  clearAllFilter = () => {
    this.setState(
      {
        activeCategory: '',
        activeOptionId: sortbyOptions[0].optionId,
        activeRating: '',
        searchText: '',
      },
      this.getProducts,
    )
  }

  getProducts = async () => {
    this.setState({
      apiStatus: apiStatusList.statusInprogress,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {
      activeOptionId,
      activeCategory,
      searchText,
      activeRating,
    } = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&title_search=${searchText}&category=${activeCategory}&rating=${activeRating}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        apiStatus: apiStatusList.statusSuccess,
      })
    } else {
      this.setState({
        apiStatus: apiStatusList.statusFailure,
      })
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  renderProductsList = () => {
    const {productsList, activeOptionId} = this.state
    const productLength = productsList.length === 0
    return productLength ? (
      <div>
        <img
          alt="no products"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
        />
        <h1>No Products Found</h1>
        <p>We could not find any products.Try other filters.</p>
      </div>
    ) : (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )

    // TODO: Add No Products View
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailure = () => (
    <div>
      <img
        alt="products failure"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>
        We are having some trouble processing your request.Please try again.
      </p>
    </div>
  )

  renderAllProducts = () => {
    const {apiStatus} = this.state
    console.log('rav')
    console.log(apiStatus)
    switch (apiStatus) {
      case apiStatusList.statusSuccess:
        return this.renderProductsList()
      case apiStatusList.statusInprogress:
        return this.renderLoader()
      case apiStatusList.statusFailure:
        return this.renderFailure()
      default:
        return null
    }
  }

  // TODO: Add failure view

  render() {
    const {activeCategory, searchText, activeRating} = this.state

    return (
      <div className="all-products-section">
        {/* TODO: Update the below element */}
        <FiltersGroup
          ratingsList={ratingsList}
          categoryOptions={categoryOptions}
          updateSearchText={this.updateSearchText}
          updateEnterSearch={this.updateEnterSearch}
          searchText={searchText}
          updateCategory={this.updateCategory}
          activeCategory={activeCategory}
          updateRating={this.updateRating}
          activeRating={activeRating}
          clearAllFilter={this.clearAllFilter}
        />
        {this.renderAllProducts()}
      </div>
    )
  }
}

export default AllProductsSection
