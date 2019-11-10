// import './App.css';
import React from 'react';
import {
  Grid,
  MenuItem,
  TextField,
} from '@material-ui/core';
import {
  withStyles
} from '@material-ui/core/styles';

const styles = {
  menu: {
    width: 200,
  },
  textField: {
    marginLeft: 1,
    marginRight: 1,
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      bands: [],
      subBands: [],
      currProduct: '',
      currBand: '',
      currSubband: ''
    };
  }

  fetchProductData = async () => {
    const url= "http://s3.ap-south-1.amazonaws.com/ypui-resources/InterviewQns/Products.json";
    const result = await fetch(url);
    if ( result.status === 200 ) {
      return result.json() || [];
    } else {
      return [];
    }
  };

  componentDidMount() {
    let products = [];
    this.fetchProductData().then((response) => {
      response.forEach((item) => {
        if(!products.find(product => product.id === item.Productid.id)) {
          products.push(item.Productid);
        }
      });
      this.setState({products: products, response: response});
    });
  }

  handleProductChange = event => {
    let currProduct = event.target.value;
    let bands = [];
    if ( currProduct ) {
      let rows = this.state.response.filter(item => item.Productid.id === currProduct);
      rows.forEach((item) => {
        if(!bands.find((band) => band.id === item.Band.id)) {
          bands.push(item.Band);
        }
      });
    }
    this.setState({currProduct, bands, currBand:'', currSubband: ''});
  };
  
  handleBandChange = event => {
    let currBand = event.target.value;
    let subBands = [];
    if ( currBand ) {
      let rows = this.state.response.filter(item => item.Band.id === currBand);
      rows.forEach((item) => {
        if(!subBands.find((subband) => subband.id === item.Subband.id)) {
          subBands.push(item.Subband);
        }
      });
    }
    this.setState({currBand, subBands, currSubband: ''});
  };

  handleSubBandChange = event => {
    let currSubband = event.target.value;
    this.setState({currSubband});
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <Grid item xs>
          <TextField
            id="product"
            name="product"
            select
            label="Product"
            className={classes.textField}
            value={this.state.currProduct}
            onChange={this.handleProductChange}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            helperText="Please select product"
            margin="normal"
            variant="outlined"
          >
            {this.state.products.map(product => (
              <MenuItem key={product.id} value={product.id}>
                {product.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="band"
            name="band"
            select
            label="Band"
            className={classes.textField}
            value={this.state.currBand}
            onChange={this.handleBandChange}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            helperText="Please select band"
            margin="normal"
            variant="outlined"
          >
            {this.state.bands.map(band => (
              <MenuItem key={band.id} value={band.id}>
                {band.val}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="subband"
            name="subband"
            select
            label="Subband"
            className={classes.textField}
            value={this.state.currSubband}
            onChange={this.handleSubBandChange}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            helperText="Please select Subband"
            margin="normal"
            variant="outlined"
          >
            {this.state.subBands.map(subband => (
              <MenuItem key={subband.id} value={subband.id}>
                {subband.val}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    );
  };
}

export default withStyles(styles)(App);