'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        liked: false,
        customizer : {}
     };
     this.productDetail = this.productDetail.bind(this);
    
  }
  productDetail(products){
        console.log("data", products);
        let productView = products.map( (product, index) =>{
           return <div key={index}><h1>{product.promize_customizer_id}</h1>
           {product.pps.map((section, index) => {
               return <div key={index}>
                   <h1>{section.section_name}</h1>
                   {section.ppt.map((tab, index) => {
                       return <div key={index}>
                           <p>{tab.tab_name}</p>
                       </div>
                   })}
               </div> 

            })}
            </div>
        })

        return (<div>{productView}</div>);
  }

  render() {
    if (this.state.liked) {
        var my = {
            "0": "www.bluesky.com",
            "1": "6fe973aa2ed56c9a0225b0903360b9ab45e416ba",
            "2": "848233365551"
            }
        const userAction = async () => {
            const response = await fetch('https://cloudcdn.productimize.com/dcprocld/promize/customproductdetail',{
                    method: 'POST',
                    body: JSON.stringify(my), // string or object
                    headers:{
                      'Content-Type': 'application/json'
                    }
                  }
            );
            const myJson =  await response.json();
             //extract JSON from the http response
             console.log("myjson",myJson);
            // this.setState({customizer: myJson});
            this.productDetail(myJson);
          }
          userAction();
    }
    let productView
    return <div> {e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Get Data'
    )}
    </div>
  }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(e(LikeButton), domContainer);

