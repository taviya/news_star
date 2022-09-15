import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  }

  constructor(props) {
      super(props);
      this.state = {
          articles: [],
          loading: false,
          page: 1,
          totalResults: 0,
      }
      document.title = `${this.capitalizeFirstLetter(this.props.category)}`;
  }
  
  fetchMoreData = async() => {
    // console.log(this.state.page)
    // this.setState({page: this.state.page + 1});
    // console.log(this.state.page)
    
    const url =  `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // this.setState({loading: true})
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parseData.articles),
            totalResults: parseData.totalResults,
            loading: false,
        });
        this.setState({page: this.state.page + 1});
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async updateNews(){
    this.props.setProgress(10)
    const url =  `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true})
        let data = await fetch(url);
        this.props.setProgress(30)
        let parseData = await data.json();
        this.props.setProgress(70)
        this.setState({
            articles: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false,
        });
        this.props.setProgress(100)
  }
  
  async componentDidMount() {
        // let url =  `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // this.setState({loading: true})
        // let data = await fetch(url);
        // let parseData = await data.json();
        // this.setState({
        //     articles: parseData.articles,
        //     totalResults: parseData.totalResults,
        //     loading: false,
        // });
        this.updateNews();
        this.setState({page: this.state.page + 1});
  }

  handlerPreClick = async() => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    //     this.setState({loading: true})
    //     let data = await fetch(url);
    //     let parseData = await data.json();
    //     this.setState({
    //         page: this.state.page - 1,
    //         articles: parseData.articles,
    //         loading: false,
    //     })
    this.setState({
      page: this.state.page - 1,
    });
    this.updateNews();
  }

  handlerNexClick = async () => {
    // if(!this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        //     this.setState({loading: true})
        //     let data = await fetch(url);
        //     let parseData = await data.json();
        //     this.setState({
        //         page: this.state.page + 1,
        //         articles: parseData.articles,
        //         loading: false,
        //     })
    // }

    this.setState({
      page: this.state.page + 1,
    });
    this.updateNews();
  }

  render() {
    return (
        <>
            <h2>Headline - {this.capitalizeFirstLetter(this.props.category)}</h2>
            {this.state.loading && <Spinner />}

            <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            //   loader={<h4>Loading...</h4>}
            loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                    {this.state.articles.map((value, key) => {
                        return <div key={value.url} className="col-md-4">
                            <NewsItem title={value.title ? value.title.slice(0, 60) : ''} description={value.description ? value.description.slice(0, 88) : ''} imageUrl={value.urlToImage} newsUrl={value.url} date={value.publishedAt} author={value.author} source={value.source.name}/>    
                        </div>
                    })}
                    </div>
                </div>
            
                {/* <div className="container d-flex justify-content-around">
                    <button type="button" className="btn btn-dark arrow left" disabled={this.state.page <= 1} onClick={this.handlerPreClick}>&larr; Pre</button>
                    <button type="button" className="btn btn-dark arrow right" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} onClick={this.handlerNexClick}>Next &rarr;</button>
                </div> */}
            </InfiniteScroll>
        </>
    )
  }
}
