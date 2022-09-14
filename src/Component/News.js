import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
export default class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  }

  constructor() {
      super();
      this.state = {
          articles: [],
          loading: false,
          page: 1,
      }
  }
  
  async componentDidMount() {
        let url =  `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ea523bb0631745f58a344a455396c9fd&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading: true})
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            articles: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false,
        });
  }

  handlerPreClick = async() => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ea523bb0631745f58a344a455396c9fd&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true})
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            page: this.state.page - 1,
            articles: parseData.articles,
            loading: false,
        })
  }

  handlerNexClick = async () => {
    // if(!this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ea523bb0631745f58a344a455396c9fd&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading: true})
            let data = await fetch(url);
            let parseData = await data.json();
            this.setState({
                page: this.state.page + 1,
                articles: parseData.articles,
                loading: false,
            })
    // }
  }

  render() {
    return (
      <div className='container my-3'>
        <h2>Headline</h2>
        {this.state.loading && <Spinner />}
        <div className="row">
        {!this.state.loading && this.state.articles.map((value, key) => {
            return <div key={value.url} className="col-md-4">
                <NewsItem title={value.title ? value.title.slice(0, 60) : ''} description={value.description ? value.description.slice(0, 88) : ''} imageUrl={value.urlToImage} newsUrl={value.url} date={value.publishedAt} author={value.author} source={value.source.name}/>    
            </div>
        })}
        </div>
        <div className="container d-flex justify-content-around">
            <button type="button" className="btn btn-dark arrow left" disabled={this.state.page <= 1} onClick={this.handlerPreClick}>&larr; Pre</button>
            <button type="button" className="btn btn-dark arrow right" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} onClick={this.handlerNexClick}>Next &rarr;</button>
        </div>
    </div>
    )
  }
}
