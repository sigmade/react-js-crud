import React, {Component} from "react";
import MyForm from "./MyForm";
import axios from "axios";
import CustomerList from "./CustomerList";
import "./app.css";
import Loader from "./Loader";

class App extends Component {
    state = {
        customers: [],
        loader: false,
        url: "http://127.0.0.1:8000/api/customers"
    };
    getCustomers = async () => {
        this.setState({ loader: true });
        const customers = await axios.get(this.state.url);
        this.setState({ customers: customers.data, loader: false });
      };

      deleteCustomer = async id => {
        this.setState({ loader: true });
    
        await axios.delete(`${this.state.url}/${id}`).catch(e => {
          // console.log(e.message);
          alert(e.response.status === 404 ? "Customer not found" : "");
        });
    
        this.getCustomers();
      };

    
    componentDidMount() {
    this.getCustomers();
    }

    onDelete = id => {
        // console.log("app ", id);
        this.deleteCustomer(id);
    };

    render (){
        return(
         <div>
            <div className="ui fixed inverted menu">
                <div className="ui container">
                    <a href="/#">
                        React JS CRUD with Laravel API
                    </a>
                </div>
            </div>
            <div className="ui main container">
                <MyForm />
                {
                    this.state.loader ? <Loader /> : ""
                }
                <CustomerList customers={this.state.customers} onDelete={this.onDelete}/>
            </div>
         </div>
        );
    }
}

export default App;