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

  componentWillMount(){
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
         console.log("myjson",myJson);
        //this.productDetail(myJson);
        this.setState({customizer: myJson});
      }
  }
  componentWillReceiveProps(props){
    console.log("props",props);
  }

  render() {

    console.log("this",this.state);
    const products = this.state.customizer;
    let productView='';
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
}

const domContainer = document.querySelector('#root');
ReactDOM.render(e(LikeButton), domContainer);

