import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
    return (
      <div className='my-3'>
        <div className="card">
        <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{zIndex: "1", left: "90%"}}>
          {source}
        </span>
          <img src={imageUrl ? imageUrl : 'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2018_21/2442281/og-nbcnews1200x630.png'} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {author ? author : 'Unknown'} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target='_blank' rel="noreferrer" className='btn btn-dark btn-sm'>Go to details</a>
          </div>
        </div>
      </div>
    )
  }
}
