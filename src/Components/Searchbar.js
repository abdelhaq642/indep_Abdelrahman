import React from "react";
import { MDBCol, MDBInput } from "mdbreact";
import axios from 'axios';


class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        // this.handleChange = this.handleChange.bind(this);
        this.state = {apiResponse:""};

    }

    // handleChange = (e) => {
    //     this.setState({text: e.target.value});
    //
    //
    //     this.setState( {
    //         [text]: text
    // });
    // };

    callAPI(){
        fetch("http://localhost:4000/results" +
            "")
            .then(res => res.text())
            .then(res => this.setState({apiResponse: res}));
    }


    componentDidMount() {
        axios.get(`http://localhost:4000/results`)
            .then(res => {
                const text = res.data;
                this.setState({ text });
            });
        this.callAPI();

    }

    onSubmit = e => {
        e.preventDefault();
        axios.get('http://localhost:4000/results?text=' + this.state.text.toString()).then(res => this.setState({apiResponse: res}) )

    };



    render() {
        return (
            <div>
            <form onSubmit={(e) => this.onSubmit(e)} className="search">
            <MDBCol className="searchbar" md="6">
                <MDBInput name="text" hint="Search" type="text" containerClass="active-pink active-pink-2 mt-0 mb-3" />
            </MDBCol>
                <label><input type="submit" value="submit"></input>
                </label>
            </form>
                <p>{this.state.apiResponse}</p>
            </div>
        );
    }
}
// onChange={this.handleChange}
export default SearchPage;